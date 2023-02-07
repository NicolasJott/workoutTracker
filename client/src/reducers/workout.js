import {
    GET_WORKOUTS,
    LOG_ERROR,
    ADD_WORKOUT,
    GET_WORKOUT,

} from "../actions/types";

const initialState = {
    workouts: [],
    workout: null,
    loading: true,
    error: {},
};

const workoutReducer = ( state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_WORKOUTS:
            return {
                ...state,
                workouts: payload,
                loading: false,
            };
        case GET_WORKOUT:
            return {
                ...state,
                workout: payload,
                loading: false,
            };
        case ADD_WORKOUT:
            return {
                ...state,
                workouts: [payload, ...state.workouts],
                loading: false,
            }
        case LOG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }

}

export default workoutReducer;
