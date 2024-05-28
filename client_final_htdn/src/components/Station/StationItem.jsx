import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import * as stationActions from "../../store/actions/stations";
import UpdateStation from "../../containers/System/UpdateStation";

const StationItem = ({ station, index, deleteStation }) => {
    const handleDelete = () => {
        deleteStation(station._id);
    };

    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{station.name}</td>
            <td>{station.addressDetail}</td>
            <td>{station.nameProvince}</td>
            <td>{station.company_id?  station.company_id.name : "Không có"}</td>
            <td style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant="outline-danger"
                    style={{ marginRight: "10px" }}
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
                <UpdateStation station={station} />
            </td>
        </tr>
    );
};

const mapStateToProps = (state) => {
    return {
        stations: state.stations,
    };
};

export default connect(mapStateToProps, stationActions)(StationItem);
