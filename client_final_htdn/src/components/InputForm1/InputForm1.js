import React from 'react';

const InputForm = ({ value, onChange, placeholder, onEnter }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onEnter();
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 p-2 w-[80%] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            placeholder="Enter license plates..."
            onKeyPress={handleKeyPress}
        />
    );
};

export default InputForm;