import React from 'react'
const Modal = ({ isOpen, onClose, children  ,Title}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex">
            <div className="relative m-auto w-1/2 max-w-lg">
                <div className="relative bg-white shadow-md rounded-lg">
                    <div className="p-4 border-b">
                        <button onClick={onClose} className="absolute top-0 right-0 p-2 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 7.293a1 1 0 00-1.414 1.414L10.586 10l-1.707 1.707a1 1 0 101.414 1.414L12 11.414l1.707 1.707a1 1 0 001.414-1.414L13.414 10l1.707-1.707a1 1 0 00-1.414-1.414L12 8.586 10.293 7.293a1 1 0 00-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold">{Title}</h2>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
