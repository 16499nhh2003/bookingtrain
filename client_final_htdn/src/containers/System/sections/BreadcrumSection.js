import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBFormInline,
    MDBBtn,
} from "mdbreact";

const BreadcrumSection = () => {
    return (
        <MDBCard className="mb-5">
            <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>Trang chủ</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>Tổng quan</MDBBreadcrumbItem>
                </MDBBreadcrumb>
                {/* <MDBFormInline className="md-form m-0">
                    <input
                        className="form-control form-control-sm"
                        type="search"
                        placeholder="Nhập để tìm kiếm"
                        aria-label="Search"
                    />
                    <MDBBtn size="sm" color="primary" className="my-0">
                        <MDBIcon icon="search" />
                    </MDBBtn>
                </MDBFormInline> */}
            </MDBCardBody>
        </MDBCard>
    );
};

export default BreadcrumSection;