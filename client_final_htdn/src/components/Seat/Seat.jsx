import React from 'react';
import { FaChair } from 'react-icons/fa';
import './style.css'; 
const Seat = ({ isOccupied }) => {
    return (
        <div>
            {isOccupied ? (
                <FaChair style={{ color: 'red', fontSize: '24px' }} />
            ) : (
                <FaChair style={{ color: 'green', fontSize: '24px' }} />
            )}
        </div>
    );
};

export default Seat;
