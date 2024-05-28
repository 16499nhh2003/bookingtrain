import icons from './icons'
import { path } from './constanst'
import config from '../config'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons

const memuSidebar = [
    {
        id: 1,
        text: 'Quản lý xe',
        path: `/he-thong/${path.MANAGEMENT_CAR}`,
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý loại xe',
        path: `/he-thong/${path.MANAGEMENT_TYPECAR}`,
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 3,
        text: 'Quản lý chuyến xe',
        path: '/he-thong/manager/trips',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Khuyến Mãi',
        path: `/he-thong/${config.routes.Promotion}`,
        icon: <BiUserPin />
    },
    {
        id: 4,
        text: 'Quản lý các bến xe',
        path: '/he-thong/manager/stations',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Quản lý hành trình',
        path: '/he-thong/manager/driver-trip',
        icon: <BiUserPin />
    },
    {
        id: 6,
        text: 'Quản lý nhân viên',
        path: `/he-thong/${config.routes.ManagementStaff}`,
        icon: <BiUserPin />
    },
    {
        id: 7,
        text: 'Quản lý công ty',
        path: `/he-thong/${config.routes.AdminManament}`,
        icon: <BiUserPin />
    },
    {
        id: 9,
        text: 'Danh sách các điểm dừng và đón',
        path: `/he-thong/${config.routes.AddDetailLocateList}`,
        icon: <BiUserPin />
    },
    {
        id: 10,
        text: 'Báo cáo và doanh thu  ',
        path: `/he-thong/${config.routes.DoanhThuDetail}`,
        icon: <BiUserPin />
    },
]

export default memuSidebar