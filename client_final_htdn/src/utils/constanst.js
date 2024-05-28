import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const path = {
    HOME: '/*',
    LOGIN: 'login',
    REGISTER: 'register',
    VERIFICATION: 'verify-code',
    FORGOT: 'forgot-password',
    BOOKING: 'dat-ve',
    ADD_TRIP: 'them-chuyen-xe',
    EDIT_TRIP: 'sua-chuyen-xe',
    SYSTEM: '/he-thong/*',
    MANAGEMENT_CAR: 'quan-ly-xe',
    MANAGEMENT_TYPECAR: 'quan-ly-loai-xe',
    MANAGEMENT_TRIP: 'quan-ly-tuyen-xe',
    MANAGEMENT_DRIVER_TRIP: 'quan-ly-chuyen-xe'
}
export const text = {
    HOME_TITLE: 'Tuyến đường phổ biến',
    HOME_DESCRIPTION: "Công ty TNHH Vận Tải Kumho Samco Buslines được thành lập bởi Tổng Công Ty Cơ Khí Giao Thông Vận Tải Sài Gòn (SAMCO) và Kumho Construction & Engineering (H.K) Limited (KUMHO) vào ngày 12 tháng 11 năm 2007 theo giấy phép đầu tư số 411022000141 do Ủy Ban Nhân Dân TPHCM cấp. Khi mới thành lập công ty có tên “Công ty TNHH Vận Tải Tốc Hành Kumho Samco” và được đổi tên mới là “Công ty TNHH Vận Tải Kumho Samco Buslines” vào ngày 04 tháng 04 năm 2011."
}

export const location = [
    {
        id: 'hcm',
        name: 'Hồ Chí Minh- Hà Nội',
        image: 'https://phongtro123.com/images/location_hcm.jpg',
        price: 200000
    },
    {
        name: 'Phòng trọ Hà Nội - Đà nẵng ',
        image: 'https://phongtro123.com/images/location_hn.jpg',
        id: 'hn',
        price: 200000
    },
    {
        name: 'Phòng trọ Đà nẵng - Hồ Chí Minh ',
        image: 'https://phongtro123.com/images/location_dn.jpg',
        id: 'dn',
        price: 200000
    },
]

export const destinations = [
    { id: 1, name: 'Destination 1', image: 'https://phongtro123.com/images/location_hcm.jpg', description: 'Description of destination 1' },
    { id: 2, name: 'Destination 2', image: 'https://phongtro123.com/images/location_hcm.jpg', description: 'Description of destination 2' },
    { id: 3, name: 'Destination 3', image: 'https://phongtro123.com/images/location_hcm.jpg', description: 'Description of destination 3' },
];

export const showToast = (message, type) => {
    switch (type) {
        case 'success':
            toast.success(message, { position: 'top-center', autoClose: 1000 });
            break;
        case 'error':
            toast.error(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        default:
            toast.info(message);
            break;
    }
};


export const swal = (mes, type) => {
    switch (type) {
        case 'error':
            Swal.fire({
                title: 'Error!',
                text: `${mes}`,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            break;
        case 'success':
            Swal.fire({
                title: 'Success!',
                text: `${mes}`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            break;
        default:
            break
    }
}


export const f = (dateString, timeString) => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const date = dateObject.getDate();

    // Tạo đối tượng Date từ chuỗi thời gian
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Tạo lại đối tượng Date với các thành phần ngày và thời gian từ hai chuỗi đã cho
    const combinedDateTime = new Date(year, month - 1, date, hours, minutes);

    // Hiển thị đối tượng Date dưới dạng chuỗi
    const formattedDateTime = combinedDateTime.toLocaleString();
    return formattedDateTime
}