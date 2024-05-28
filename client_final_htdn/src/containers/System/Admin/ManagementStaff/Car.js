import { Col, Row } from "react-bootstrap";
import React, { useState } from 'react';
import CarTable from "./CarTable";

function Car() {

    return (
        <Row>
            <Col className="border-2 border-indigo-600">
                <h1>Danh Sách Các Xe</h1>
                <CarTable />
            </Col>
        </Row>
    );
}

export default Car;