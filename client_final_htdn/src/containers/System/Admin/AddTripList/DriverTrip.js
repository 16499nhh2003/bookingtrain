
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LichTrinhXeChay from './LichTrinhXeChay';
import { useNavigate } from 'react-router-dom';
function DriverTrip() {
    const navigate = useNavigate();

    const handleTabClick = (tabKey) => {
        if (tabKey === "trip") {
            navigate('/managementstaff/addtriplist');
        } else if (tabKey === "detaillocation") {
            navigate('/managementstaff/locatelist');
        }
    };
    return (
        <Tabs
            defaultActiveKey="lichtrinh"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabClick}
        >
            <Tab eventKey="trip" title="Thêm Chuyến Đi (Trip)">
            </Tab>
            <Tab eventKey="detaillocation" title="Chi tiết địa điểm">
            </Tab>

            <Tab eventKey="lichtrinh" title="Lịch Trình Xe Chạy">
                <LichTrinhXeChay />
            </Tab>

        </Tabs>
    );
}

export default DriverTrip;