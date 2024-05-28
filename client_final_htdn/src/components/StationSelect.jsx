import React from 'react';
import Select from 'react-select';

function StationSelect({ value, options, onChange }) {
    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={options}
        />
    );
}

export default StationSelect;
