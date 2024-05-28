import React, { memo } from 'react';

const ProvinceBtn = ({ name, image, ticketPrice }) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticketPrice);

    return (
        <div className='shadow-md rounded-lg overflow-hidden'>
            <img
                src={image}
                alt={name}
                className='w-[320px] h-32 object-cover rounded-t-lg'
            />
            <div className='p-4'>
                <div className='font-medium text-lg mb-2'>{name}</div>
                <div className='text-gray-700 font-serif'>Từ {formattedPrice}</div>
            </div>
        </div>
    );
};

export default memo(ProvinceBtn);