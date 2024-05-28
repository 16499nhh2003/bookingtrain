import React from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search by type name or description"
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
    );
}

export default SearchInput;