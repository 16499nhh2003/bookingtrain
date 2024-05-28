import React, { Component } from "react";
import { connect } from "react-redux";
import * as tripActions from "../../store/actions/trips";
// import Authenticate from "../HOC/Authenticate";

import Table from "react-bootstrap/Table";
import Pagination from "../../components/Pagination";
import TripItem from "../../components/Trip/TripItem";
import CreateTrip from "./CreateTrip";
import Swal from 'sweetalert2';


class TripsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",
        };
    }

    componentDidMount() {
        this.props.getTrips().then((res) => {
            this.setState({ totalRecords: this.props.trips.length });
        })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đã xảy ra lỗi!',
                    footer: 'Vui lòng thử lại sau.'
                });
                console.error('Error creating trips :', err);
            });
    }

    showTrips = (trips) => {
        let result = null;
        console.log(trips)
        if (trips.length > 0) {
            result = trips.map((trip, index) => {
                return <TripItem key={index} trip={trip} index={index} />;
            });
            return result;
        }
    };

    onChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex,
        });
    };

    render() {
        let { trips } = this.props;
        let { totalPages, currentPage, pageLimit, startIndex, endIndex } = this.state;
        let rowsPerPage = [];
        if (trips.length > 0) {
            rowsPerPage = trips.slice(startIndex, endIndex + 1);
        }
        return (
            <div className="section product_list_mng">
                <div className="container-fluid">
                    <div className="box_product_control mb-15">
                        <h1>Quản lý tuyến đường</h1>
                        <CreateTrip />
                        <div className="row">
                            <div className="col-xs-12 box_change_pageLimit mt-15">
                                Hiển thị
                                <select
                                    className="form-control"
                                    value={pageLimit}
                                    onChange={(e) => this.setState({ pageLimit: parseInt(e.target.value) })}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                chuyến xe
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th align="center">Số thứ tự</th>
                                <th align="center">Mã Chuyến</th>
                                <th align="center">Tên tuyến đường</th>
                                <th align="center">Địa điểm khởi hành</th>
                                <th align="center">Địa điểm kết thúc</th>
                                <th align="center">Giờ khởi hành</th>
                                <th align="center">Giờ kết thúc</th>
                                <th align="center">Giá tiền</th>
                                <th align="center">Thông tin nhà xe</th>
                                <th align="center">Tùy chọn</th>
                            </tr>
                        </thead>
                        <tbody>{this.showTrips(rowsPerPage)}</tbody>
                    </Table>

                    <div className="box_pagination">
                        <div className="row">
                            <div className="col-xs-12 box_pagination_info text-right">
                                <p>
                                    {trips.length} Chuyến xe | Trang {currentPage}/{totalPages}
                                </p>
                            </div>
                            <div className="col-xs-12 text-center ml-30">
                                <Pagination
                                    totalRecords={trips.length}
                                    pageLimit={pageLimit || 5}
                                    initialPage={1}
                                    pagesToShow={5}
                                    onChangePage={this.onChangePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips,
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        getTrips: () => dispatch(tripActions.getTrips()),
    };
};
export default connect(mapStateToProps, mapDispatchToProp)(TripsPage);
