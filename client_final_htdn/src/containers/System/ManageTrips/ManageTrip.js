import React, { useState, useEffect } from 'react'
import ListTrip from './ListTrip/ListTrip'
import { ApiTrip } from '../../../api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const ManageTrip = () => {
    const [state, setState] = useState({
        data: [],
        limit: 1,
        activePage: 1,
        totalPages: 1,
        keyword: ""
    });

    useEffect(() => {
        getTrip()
    }, [state.limit])

    const getTrip = () => {
        ApiTrip.getlist()
            .then((res) => {
                // console.log(res)
                setState(prev => ({
                    ...prev, data: res.data.trips, totalPages: res.data.totalPages, limit: res.data.limit, keyword: res.data.keywordF
                }))
            })
            .catch((error) => console.log(error));
    }

    const onchangeData = (status) => {
        if (status) {
            getTrip()
        }
    }

    const handlePageChange = (page) => {
        setState(prevState => ({
            ...prevState,
            activePage: page,
        }));
        ApiTrip.getlist(state.keyword, page, state.limit)
            .then((res) => {
                setState(prevState => ({
                    ...prevState,
                    data: res.data.trips,
                }));
            })
            .catch((error) => console.log(error));
    };

    const handleKeyword = (keyword) => {
        ApiTrip.getlist(keyword)
            .then((res) => {
                setState(prev => ({
                    ...prev, data: res.data.trips, totalPages: res.data.totalPages, limit: res.data.limit, keyword: res.data.keyword
                }))
            })
            .catch((error) => console.log(error));
    }


    return (
        <>
            <Link to={`/he-thong/them-chuyen-xe`} >
                <Button variant="outline-primary">Thêm mới chuyến xe</Button>
            </Link>
            <ListTrip trips={state.data} onchangeData={onchangeData} onKeyWord={handleKeyword} />

            <Pagination className="px-4">
                {Array.from({ length: state.totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === state.activePage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}

export default ManageTrip
