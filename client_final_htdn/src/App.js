import { Routes, Route } from "react-router-dom";
import { Login1, Header, Home, HomePage, Register, Verification } from "./containers/Public";
import { System, ManageCar, ManageCarTypes, ManageTripsAddForm, ManageTripsEditFrom, HomeManageDriverTrip } from "./containers/System";
import { path } from "./utils/constanst"
import ManageTrip from "./containers/System/ManageTrips/ManageTrip";
import PaginationStations from "./containers/System/PaginationStations";
import CreateTrip from "./containers/System/CreateTrip";
import TripsPage from "./containers/System/TripsPage";
import LichTrinhXeChay from "./containers/System/Admin/AddTripList/LichTrinhXeChay";
import ListTrip from "./containers/System/Admin/AddUserTrip/ListTrip";
import Booking from "./containers/System/Admin/AddUserTrip/Book"
import LoginCompany from './containers/System/Admin/Login'
import ManagementStaff from './containers/System/Admin/ManagementStaff'
import FormAddEmployee from './containers/System/Admin/FormAddEmployee'
import LoginAdmin from './containers/System/AdminPage/Login'
import Company from './containers/System/AdminPage/ManagementComapany/Company'
import DetailLocation from './containers/System/Admin/AddTripList/DetailLocation'
import routes from "./config/routes";
import ListInfoTrip from "./containers/Public/ListInfoTrip";
import SetupTrip from "./containers/Public/SetupTrip";
import PaymentPage from "./containers/Public/PaymentPage";
import Login from "./containers/Public/Login";
import Forgotpassword from "./containers/Public/Forgotpassword";
import ChangePass from "./containers/Public/ChangePass";
import Info from "./containers/Public/Info";
import VeCuaToi from "./containers/Public/VeCuaToi";
import DetailItem from "./containers/Public/VeCuaToi/detailItem";
import Payment from "./containers/Public/Payment";
import PaymentSuccess from "./containers/Public/PaymentSuccess";
import PaymentFailed from "./containers/Public/PaymentFailed";
import Promotion from "./containers/System/Admin/Promotion";
import DashboardPage from "./containers/System/DashboardPage";


function App() {
  return (
    <div className="h-screen w-screen ">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={`${routes.login}`} element={<Login />} />
          <Route path={routes.Forgot} element={<Forgotpassword />} />
          <Route path={`${routes.listinfotrip}`} element={<ListInfoTrip />} />
          <Route path={`${routes.Setuptrip}`} element={<SetupTrip />} />
          <Route path={`${routes.PaymentPage}`} element={<PaymentPage />} />
          <Route path={`${routes.DoiMatKhau}`} element={<ChangePass />} />
          <Route path={`${routes.InfoUser}`} element={<Info />} />
          <Route path={`${routes.VeCuaToi}`} element={<VeCuaToi />} />
          <Route path={`${routes.DetailItem}`} element={<DetailItem />} />
          <Route path={`${routes.Payment}`} element={<Payment />} />
          <Route path={`${routes.PaymentSuccess}`} element={<PaymentSuccess />} />
          <Route path={`${routes.PaymentFail}`} element={<PaymentFailed />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.MANAGEMENT_CAR} element={<ManageCar />} />
          <Route path={path.MANAGEMENT_TYPECAR} element={< ManageCarTypes />} />
          <Route path={path.MANAGEMENT_TRIP} element={<ManageTrip />} />
          <Route path={path.ADD_TRIP} element={<ManageTripsAddForm />} />
          <Route path={`${path.EDIT_TRIP}/:id`} element={<ManageTripsEditFrom />} />
          <Route path="manager/stations" element={<PaginationStations />} />
          <Route path="manager/create-trips" element={<CreateTrip />} />
          <Route path="manager/trips" element={<TripsPage />} />
          <Route path="manager/driver-trip" element={< LichTrinhXeChay />} />
          <Route path="managementstaff/usertrip/listtrip" element={<ListTrip />} />
          <Route path="managementstaff/usertrip/book" element={<Booking />} />
          <Route path={`${routes.ManagementStaff}`} element={<ManagementStaff />} />
          <Route path={`${routes.DoanhThuDetail}`} element={<DashboardPage />} />
          <Route path={`${routes.AdminManament}`} element={<Company />} />
          <Route path={`${routes.AddDetailLocateList}`} element={<DetailLocation />} />
          <Route path={`${routes.Promotion}`} element={<Promotion />} />

        </Route>
        {/*  Company */}
        <Route path={`${routes.Book}`} element={<Booking />} />
        <Route path={`${routes.LoginCompany}`} element={<LoginCompany />} />
        <Route path={`${routes.FormAddEmployee}`} element={< FormAddEmployee />} />


        {/* Admin */}
        <Route path={`${routes.LoginPage}`} element={< LoginAdmin />} />
      </Routes>
    </div>
  );
}
export default App;