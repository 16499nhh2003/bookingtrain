import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ModalWithCarousel = ({ isOpen, onClose, selectedRow }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        isOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">License Plates: {selectedRow.license_plates}</p>
                                        <p className="text-sm text-gray-500">Type of Car: {selectedRow.typecar}</p>
                                        <p className="text-sm text-gray-500">Company: {selectedRow.company}</p>
                                        <p className="text-sm text-gray-500">Availability: {selectedRow.availability ? 'Availability' : 'UnAvaibility'}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Images</h3>
                                        <Slider {...settings}>
                                            {selectedRow.images.map((image, index) => (
                                                <div key={index}>
                                                    <img src={image} alt={`Car Image ${index}`} className="rounded-lg mx-auto" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ModalWithCarousel;
