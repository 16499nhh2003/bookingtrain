
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DetailLocation from './DetailLocation';
import { useNavigate } from 'react-router-dom';


function Detaillocate() {
    const navigate = useNavigate();

    const handleTabClick = (tabKey) => {
        if (tabKey === "trip") {
            navigate('/managementstaff/addtriplist');
        } else if (tabKey === "lichtrinh") {
            navigate('/managementstaff/drivertriplist');
        }
    };
    return (
        <Tabs
            defaultActiveKey="detaillocation"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabClick}
        >
            <Tab eventKey="trip" title="Thêm Chuyến Đi (Trip)">
                {/* <TripTable/> */}
            </Tab>
            <Tab eventKey="detaillocation" title="Chi tiết địa điểm">
                <DetailLocation />
            </Tab>

            <Tab eventKey="lichtrinh" title="Lịch Trình Xe Chạy">
                {/* <LichTrinhXeChay/> */}
            </Tab>

        </Tabs>
    );
}

export default Detaillocate;