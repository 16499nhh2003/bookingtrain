import React, { useState } from 'react'
import axios from '../../axiosConfig'
const CreatePickUpForm = () => {
    const [pickups, setPickups] = useState([{ name: '', timePickUp: '', idTrip: '' }]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newPickups = [...pickups];
        newPickups[index][name] = value;
        setPickups(newPickups);
    };

    const addPickUp = () => {
        setPickups([...pickups, { name: '', timePickUp: '', idTrip: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // const response = await axios.post('/api/pickups', { pickups });
            // console.log(response.data);
        } catch (error) {
            console.error('Error creating pickups:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {pickups.map((pickup, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={pickup.name}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <input
                            type="text"
                            name="timePickUp"
                            placeholder="Time Pick Up"
                            value={pickup.timePickUp}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <input
                            type="text"
                            name="idTrip"
                            placeholder="ID Trip"
                            value={pickup.idTrip}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addPickUp}>Add Pickup</button>
                <button type="submit">Create Pickups</button>
            </form>
        </div>
    )
}

export default CreatePickUpForm
