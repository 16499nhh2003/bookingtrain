import React from 'react'
import { Modal } from '../../../../components';
import AddCarForm from '../AddCarForm';
const AddCarModal = ({ isOpen, onClose, onSubmit }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%', // Adjust the width as needed
            maxHeight: '80%', // Adjust the maxHeight as needed
            overflowY: 'auto' // Enable vertical scrolling if content exceeds maxHeight
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} Title="Add car" style={customStyles}>
            <AddCarForm onSubmit={onSubmit} />
        </Modal>
    );
};

export default AddCarModal;