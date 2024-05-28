import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Col, Row } from "react-bootstrap";
import React from 'react';
import { SearchItem } from '../../components';
import icons from '../../utils/icons';
import Swal from "sweetalert2";

const { BsChevronRight, HiOutlineLocationMarker, RiCalendarLine, FiUsers, FiSearch } = icons;

const Search = () => {
    const handleclickChuaphattrien = () => {
        Swal.fire('Chưa triển khai', "info")
    }
    return (
        <>
            <Row >
                <div className="flex justify-content-center">
                    <div className="m-5 p-2 cursor-pointer text-sky-800 fw-bold border-b-2 border-indigo-500" >
                        <Col className="flex">
                            <svg style={{ width: "30px" }} viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"></path></svg>
                            <h1 className="pt-2 ml-2">Xe Khách</h1>
                        </Col>
                    </div>
                    <div className="m-5 p-2 cursor-pointer border-b-2 border-indigo-500" onClick={handleclickChuaphattrien}>
                        <Col className="flex">
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" /></svg>
                            <h1 className="pt-2 ml-2">Máy Bay</h1>
                        </Col>
                    </div>
                    <div className="m-5 p-2 cursor-pointer border-b-2 border-indigo-500" onClick={handleclickChuaphattrien}>
                        <Col className="flex">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 2a4 4 0 0 0-4 4v11a1 1 0 0 0 1 1h1l-2 4h2l.6-1.2h10.8l.6 1.2h2l-2-4h1a1 1 0 0 0 1-1V6a4 4 0 0 0-4-4h-8zm8 16h-8L8 19h9l-.5-1zm-8-14a2 2 0 0 0-2 2v5h5V4h-3zm10 7h-5V4h3a2 2 0 0 1 2 2v5zm-9 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM17 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#474747"></path></svg>
                            <h1 className="pt-2 ml-2">Tàu Hỏa</h1>
                        </Col>
                    </div>
                    <div className="m-5 p-2 cursor-pointer border-b-2 border-indigo-500" onClick={handleclickChuaphattrien}>
                        <Col className="flex">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_30084_225879)" fill="#474747"><path d="M.51 4.637L4.68.497C5 .18 5.44 0 5.9 0h11.374C18.223 0 19 .763 19 1.714v6c0 .943-.777 1.715-1.727 1.715A2.578 2.578 0 0 1 14.682 12a2.578 2.578 0 0 1-2.591-2.571H6.909A2.578 2.578 0 0 1 4.32 12a2.578 2.578 0 0 1-2.592-2.571C.777 9.429 0 8.657 0 7.714v-1.86c0-.454.181-.891.51-1.217zm16.763-.351V2.57a.863.863 0 0 0-.864-.857h-2.59v3.429h2.59a.863.863 0 0 0 .864-.857zM14.682 10.5c.596 0 1.08-.48 1.08-1.071 0-.592-.484-1.072-1.08-1.072-.596 0-1.08.48-1.08 1.072 0 .591.484 1.071 1.08 1.071zM8.636 5.143h3.455V1.714H8.636v3.429zM4.318 10.5c.596 0 1.08-.48 1.08-1.071 0-.592-.484-1.072-1.08-1.072-.596 0-1.08.48-1.08 1.072 0 .591.484 1.071 1.08 1.071zM6.91 5.143V1.714h-.864L2.591 5.143h4.318zM21.167 18.284c-.128 0-.255.022-.376.036l-1.459-1.464h1.126c.39 0 .709-.321.709-.714v-.271a.707.707 0 0 0-1.027-.636l-1.615.814-1.82-1.835a.689.689 0 0 0-.497-.214h-2.125a.713.713 0 0 0 0 1.428h1.537c.192 0 .369.079.503.207l1.212 1.221h-2.373a.702.702 0 0 0-.32.079l-2.223 1.12a.697.697 0 0 1-.815-.135l-.85-.857a.742.742 0 0 0-.503-.207H7.708a.713.713 0 0 0 0 1.428h2.125c-1.785 0-3.18 1.657-2.755 3.528a2.816 2.816 0 0 0 2.09 2.106 2.839 2.839 0 0 0 3.499-2.778l.998 1.007c.27.272.63.421 1.006.421h.716c.51 0 .977-.27 1.232-.72l2.061-3.635.716.721a2.85 2.85 0 0 0-.978 2.892c.241 1.028 1.07 1.863 2.09 2.1 1.849.42 3.492-.993 3.492-2.786 0-1.578-1.268-2.856-2.833-2.856zM9.833 22.568c-.779 0-1.416-.642-1.416-1.428 0-.785.637-1.428 1.416-1.428.78 0 1.417.643 1.417 1.428 0 .786-.637 1.428-1.417 1.428zm11.334 0c-.78 0-1.417-.642-1.417-1.428 0-.785.637-1.428 1.417-1.428.779 0 1.416.643 1.416 1.428 0 .786-.637 1.428-1.416 1.428z"></path></g></svg>
                            <h1 className="pt-2 ml-2">Thuê Xe</h1>
                        </Col>
                    </div>
                </div>
            </Row>
            <div className='p-[10px] w-3/5 my-3 bg-secondary1 rounded-lg flex flex-col lg:flex-row items-center justify-around gap-2'>
                <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} defaultText={'Điểm đi'} />
                <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} defaultText={'Điểm đến'} />
                <SearchItem IconBefore={<RiCalendarLine />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} defaultText={'Ngày đi'} />
                <SearchItem IconBefore={<FiUsers />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} defaultText={'Số lượng người'} />
                <button
                    type='button'
                    onClick={() => { }}
                    className='outline-none py-2 px-4 bg-[#febb02] text-sm flex items-center justify-center gap-2 text-white font-medium rounded-lg lg:rounded-none lg:h-[40px]'
                >
                    <FiSearch />
                </button>
            </div>
        </>

    );
};

export default Search;
