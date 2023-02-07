import api from '../utils/api';
import {ADD_WORKOUT, GET_WORKOUTS, LOG_ERROR} from "./types";
import {setAlert} from "./alert";

export const getWorkouts = () => async (dispatch) => {
    try {
        const res = await api.get('/workout');

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


export const addWorkout = ({ workoutType, workout, sets, reps, time, calories }) => async (dispatch) => {

    const body = { workoutType, workout, sets, reps, time, calories };

    try {
        const res = await api.post('/workout', body);

        dispatch({
            type: ADD_WORKOUT,
            payload: res.data,
        });

        dispatch(setAlert('WorkoutPage Added', 'success'));
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
