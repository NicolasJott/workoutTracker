import {
    GET_WORKOUTS,
    LOG_ERROR,
    ADD_WORKOUT,
    GET_WORKOUT,
    ADD_SET,
    GET_SET, DELETE_WORKOUT, SAVE_SET, DELETE_SET,

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
        case DELETE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout._id !== payload),
                loading: false,
            }
        case LOG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        case SAVE_SET:
            return {
                ...state,
                workout: { ...state.workout, sets: payload},
                loading: false,
            }
        case ADD_SET:
            console.log(payload)
           return {
               ...state,
                workout: {...state.workout, numSets: payload},
            loading: false,
        }
        case GET_SET:
            return {
                workout: payload,
                loading: false,
            }
        case DELETE_SET:
            return  {
                ...state,
                workouts: state.workouts.filter((workout) => workout.set_items !== payload),
                loading: false,
            }
        default:
            return state;
    }

}

export default workoutReducer;

