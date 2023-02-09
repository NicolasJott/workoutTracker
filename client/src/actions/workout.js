import api from '../utils/api';
import {ADD_WORKOUT, GET_WORKOUTS, LOG_ERROR} from "./types";
import {setAlert} from "./alert";

export const getWorkouts = (selectedDate) => async (dispatch) => {
    try {
        const formattedDate = selectedDate.toLocaleDateString("en-US", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const res = await api.get(`/workout?date=${formattedDate}`);

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


export const addWorkout = ({ workoutType, workout, sets, reps, time, calories, selectedDate }) => async (dispatch) => {

    const date = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const body = { workoutType, workout, sets, reps, time, calories, date };

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
