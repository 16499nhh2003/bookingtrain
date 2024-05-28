import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from "mdbreact";

const AdminCardSection1 = ({ data }) => {
    return (
        <MDBRow className="mb-4">
            <MDBCol xl="3" md="6" className="mb-r">
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="money-bill-alt" className="primary-color" />
                        <div className="data">
                            <p>Tổng doanh thu</p>
                            <h4>
                                <strong>{data.total}</strong>
                            </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                            <div
                                aria-valuemax="100"
                                aria-valuemin="0"
                                aria-valuenow="25"
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "25%" }}
                            ></div>
                        </div>
                        <MDBCardText>Cao hơn tuần gần nhất (25%)</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="6" className="mb-r">
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="chart-line" className="warning-color" />
                        <div className="data">
                            <p>Số lượng nhân viên</p>
                            <h4>
                                <strong>{data?.staffs?.length}</strong>
                            </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                            <div
                                aria-valuemax="100"
                                aria-valuemin="0"
                                aria-valuenow="25"
                                className="progress-bar bg grey"
                                role="progressbar"
                                style={{ width: "25%" }}
                            ></div>
                        </div>
                        <MDBCardText>Cao hơn tuần gần nhất (25%)</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="6" className="mb-r">
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="chart-pie" className="light-blue lighten-1" />
                        <div className="data">
                            <p>Số tuyến đường của công ty</p>
                            <h4>
                                <strong>{data?.tripCount}</strong>
                            </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                            <div
                                aria-valuemax="100"
                                aria-valuemin="0"
                                aria-valuenow="25"
                                className="progress-bar grey darken-2"
                                role="progressbar"
                                style={{ width: "75%" }}
                            ></div>
                        </div>
                        <MDBCardText>Cao hơn tuần gần nhất (75%)</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="6" className="mb-r">
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="chart-bar" className="red accent-2" />
                        <div className="data">
                            <p>Tổng số chuyến xe</p>
                            <h4>
                                <strong>{data?.drivertripCount}</strong>
                            </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                            <div
                                aria-valuemax="100"
                                aria-valuemin="0"
                                aria-valuenow="25"
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "25%" }}
                            ></div>
                        </div>
                        <MDBCardText>Cao hơn tuần gần nhất(25%)</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
};

export default AdminCardSection1;