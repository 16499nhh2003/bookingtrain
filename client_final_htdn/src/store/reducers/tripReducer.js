const initialState = [];
const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TRIPS":
            // console.log(action.payload)
            // return [...state, action.payload.trips];
            return action.payload.trips

        case "CREATE_TRIP":
            console.log(typeof(state))
            return [...state, action.payload.newTrip];

        case "UPDATE_TRIP":
            console.log(action.payload)
            const index = state.findIndex((st) => st._id === action.payload.updatedTrip._id);
            state[index] = action.payload.updatedTrip;
            return [...state];

        case "DELETE_TRIP":
            return state.filter((tr) => tr._id !== action.payload);
        default:
            return state;
    }
};

export default tripsReducer;