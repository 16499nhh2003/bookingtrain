import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Company from './Company';
import Contact from './Contact';
import TypeCar from './TypeCar';
function ManagementCompany() {
    return ( <>
            <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="trip" title="Quản Lý Công Ty Xe">
                <Company />
            </Tab>
            <Tab eventKey="typecar" title="Quản Lý Loại Xe">
                <TypeCar/>
            </Tab>
            <Tab eventKey="comment" title="Bình Luận">
                <Contact/>
            </Tab>


        </Tabs>

        
    </> );
}

export default ManagementCompany;