import React, { Component } from "react";
import StationItem from "../../components/Station/StationItem";
import * as stationActions from "../../store/actions/stations";
import { connect } from "react-redux";
import { Table, Button } from 'react-bootstrap';

import Pagination from '../../components/Pagination'
import CreateStation from "../../components/Station/CreateStation";
import "./styles.css";


class PaginationStations extends Component {
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
        this.props.getStations().then((result) => {
            const { stations } = this.props;
            this.setState({
                totalRecords: stations.results.length,
                totalPages: Math.ceil(stations.results.length / this.state.pageLimit),
            });
        }).catch((err) => {

        });;
    }
    
    showStations = (stations) => {
        if (stations.length > 0) {
            return stations.map((station, index) => (
                <StationItem key={index} station={station} index={index} />
            ));
        } else {
            return null;
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
        let { stations } = this.props;
        let { totalPages, currentPage, pageLimit, startIndex, endIndex } = this.state;
        let rowsPerPage = [];
        if (stations.results) {
            stations = stations.results;
            rowsPerPage = stations.slice(startIndex, endIndex + 1);
        }
        return (
            <div className="section product_list_mng">
                <div className="container-fluid">
                    <div className="box_product_control mb-15">
                        <h1>Quản lý bến xe</h1>
                        <CreateStation />
                        <div className="row">
                            <div className="col-xs-12 box_change_pagelimit mt-15">
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
                                bến xe
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">Số thứ tự</th>
                                <th className="text-center">Tên bến xe</th>
                                <th className="text-center">Địa chỉ</th>
                                <th className="text-center">Tỉnh thành</th>
                                <th className="text-center">Tên công ty</th>
                                <th className="text-center">Tùy chọn</th>
                            </tr>
                        </thead>
                        <tbody>{this.showStations(rowsPerPage)}</tbody>
                    </Table>

                    <div className="box_pagination">
                        <div className="row">
                            <div className="col-xs-12 box_pagination_info text-right">
                                <p>
                                    {stations.length} bến xe | Trang {currentPage}/{totalPages}
                                </p>
                            </div>
                            <div className="col-xs-12 text-center ml-30">
                                <Pagination
                                    totalRecords={stations.length}
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
        stations: state.stations,
    };
};

export default connect(mapStateToProps, stationActions)(PaginationStations);