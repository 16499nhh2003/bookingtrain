import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TripTable from './TripTable';
import { useNavigate } from 'react-router-dom';

function AddTripList() {
    const navigate = useNavigate();

    const handleTabClick = (tabKey) => {
        if (tabKey === "detaillocation") {
            navigate('/managementstaff/locatelist');
        } else if (tabKey === "lichtrinh") {
            navigate('/managementstaff/drivertriplist');
        }
    };

    return ( 
        <Tabs
            defaultActiveKey="trip"
            id="uncontrolled-tab-example"
            className="mb-3 "
            onSelect={handleTabClick}
        >
            <Tab eventKey="trip" title="Thêm Chuyến Đi (Trip)">
                <TripTable/>
            </Tab>
            <Tab eventKey="detaillocation" title="Chi tiết địa điểm">
                {/* Content for the "Chi tiết địa điểm" tab */}
            </Tab>
            <Tab eventKey="lichtrinh" title="Lịch Trình Xe Chạy">
                {/* Content for the "Lịch Trình Xe Chạy" tab */}
            </Tab>
        </Tabs>
     );
}

export default AddTripList;
