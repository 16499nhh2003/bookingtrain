import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { ApiCar, ApiCompany, ApiTypeCar } from '../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { validateLicensePlates } from '../../../../utils/validate';
import Cookies from 'js-cookie';

const AddCarForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        license_plates: '',
        typecar_id: '',
        phone: '',
        images: [],
        company_ : ''
    });
    const [typeCars, setTypeCars] = useState([]);
    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTypeCars();
        const company_ = Cookies.get('company');
        const userObject = JSON.parse(company_);
        setFormData(prev => ({ ...prev, company_: userObject.phone }))
    }, []);


    // const fetchCompany = async () => {
    //     try {
    //         const response = await ApiCompany.getCompanyByUser(_id);
    //         const companyId = response?.data?.data?._id;
    //         setFormData(prev => ({ ...prev, company_id: companyId }));
    //     } catch (error) {
    //         console.error('Failed to fetch type cars:', error);
    //     }
    // };

    const fetchTypeCars = async () => {
        try {
            const response = await ApiTypeCar.getAll();
            setTypeCars(response?.data.typeCars);
        } catch (error) {
            console.error('Failed to fetch type cars:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            await onSubmit(formData);
            setFormData({
                license_plates: '',
                typecar_id: '',
                images: [],
            });
            setImagePreviews([]);
            setLoading(false);
        }
    }, [formData, onSubmit]);

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        const licensePlateError = validateLicensePlates(formData.license_plates);
        if (licensePlateError) {
            newErrors.license_plates = licensePlateError;
            valid = false;
        }
        if (!formData.typecar_id) {
            newErrors.typecar_id = 'Type of Car is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    return (
        <Form onSubmit={handleSubmit} className="space-y-6" >
            <Form.Group controlId="phoneNumber">
                <Form.Label>Số điện thoại nhà xe</Form.Label>
                <Form.Control
                    type="tel"
                    readOnly 
                    name="company_phone"
                    value={formData.company_}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="licensePlates">
                <Form.Label>Biển số xe</Form.Label>
                <Form.Control
                    type="text"
                    name="license_plates"
                    value={formData.license_plates}
                    onChange={handleChange}
                    required
                />
                {errors.license_plates && <Form.Text className="text-danger">{errors.license_plates}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="typeCar">
                <Form.Label>Loại xe</Form.Label>
                <Form.Control
                    as="select"
                    name="typecar_id"
                    value={formData.typecar_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type of Car</option>
                    {typeCars.map((typeCar) => (
                        <option key={typeCar._id} value={typeCar._id}>
                            {typeCar.type_name}
                        </option>
                    ))}
                </Form.Control>
                {errors.typecar_id && <Form.Text className="text-danger">{errors.typecar_id}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="images">
                <Form.Label>Hình ảnh của chiếc xe </Form.Label>
                <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImageChange}
                />
            </Form.Group>
            {imagePreviews.length > 0 && (
                <Row className="mt-4">
                    {imagePreviews.map((preview, index) => (
                        <Col key={index} xs={4}>
                            <img src={preview} alt={`Preview ${index}`} className="img-fluid" />
                        </Col>
                    ))}
                </Row>
            )}
            <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" className="mr-2" /> : <FaSave className="mr-2" />}
                Save
            </Button>
        </Form>

    );
};

export default AddCarForm;
