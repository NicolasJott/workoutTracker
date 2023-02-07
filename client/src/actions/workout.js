import api from "js-cookie";
import {ADD_WORKOUT, GET_WORKOUTS, LOG_ERROR} from "./types";
import {setAlert} from "./alert";

export const getWorkouts = () => async (dispatch) => {
    try {
        const res = await api.get('/workouts');

        dispatch({
            type: GET_WORKOUTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: LOG_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};


export const addWorkout = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/workout', formData);

        dispatch({
            type: ADD_WORKOUT,
            payload: res.data,
        });

        dispatch(setAlert('Workout Added', 'success'));
    } catch (err) {
        dispatch({
            type: LOG_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
