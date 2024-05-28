import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { ApiTypeCar } from '../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { validateLicensePlates } from '../../../../utils/validate';

const UpdateCarForm = ({ onSubmit, selectedRow, onEdit }) => {
    const [formData, setFormData] = useState({
        license_plates: selectedRow.license_plates,
        typecar_id: selectedRow.typecar_id,
        images: selectedRow.images,
    });
    const [typeCars, setTypeCars] = useState([]);
    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState(formData.images);

    useEffect(() => {
        fetchTypeCars();
    }, []);

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

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (validateForm()) {
                onEdit(selectedRow._id, formData);
            }
        },
        [formData, onSubmit]
    );

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

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    return (
        <Form onSubmit={handleSubmit} className="space-y-6">
            <Form.Group controlId="licensePlates">
                <Form.Label>License Plates</Form.Label>
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
                <Form.Label>Type of Car</Form.Label>
                <Form.Control as="select" name="typecar_id" value={formData.typecar_id} onChange={handleChange} required>
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
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" name="images" multiple onChange={handleImageChange} />
            </Form.Group>
            {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Preview ${index}`} className="w-full h-auto" />
                    ))}
                </div>
            )}
            <Button variant="primary" type="submit">
                <FaSave className="mr-2" /> Save
            </Button>
        </Form>
    );
};

export default UpdateCarForm;
