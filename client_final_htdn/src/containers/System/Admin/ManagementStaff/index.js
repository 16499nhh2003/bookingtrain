import MembersTable from "../ManagementStaff/MembersTable";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
// import Car from "./Car";
function ManagementStaff() {
  return (
    <MembersTable />
    // <Tabs
    //   defaultActiveKey="profile"
    //   id="uncontrolled-tab-example"
    //   className="mb-3"
    // >
    //   <Tab eventKey="staff" title="Quản Lý Nhân Viên">
    //     <MembersTable />
    //   </Tab>
    //   <Tab eventKey="car" title="Quản Lý Xe">
    //     {/* <Car /> */}
    //   </Tab>
    // </Tabs>
  );
}

export default ManagementStaff;