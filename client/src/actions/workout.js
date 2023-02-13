import api from '../utils/api';
import {ADD_SET, ADD_WORKOUT, GET_SET, GET_WORKOUTS, LOG_ERROR} from "./types";
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


export const addWorkout = ({ workoutType, workout, numSets, time, calories, selectedDate }) => async (dispatch) => {

    const date = selectedDate.toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const body = { workoutType, workout, numSets, time, calories, date };

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

export const addSet = ({ index_num, reps, weight, comment}, workoutId) => async (dispatch) => {

    const body = { index_num, reps, weight, comment };

    try {
        const res = await api.post(`/workout/set/${workoutId}`, body);

        dispatch({
            type: ADD_SET,
            payload: res.data,
        });

        dispatch(setAlert('Set Added', 'success'));
    } catch (err) {
        dispatch({
            type: LOG_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
}

export const getSet = (index_num, workoutId) => async (dispatch) => {
    try{
        const res = await api.get(`/workout/set/${workoutId}?index=${index_num}`)

        dispatch({
            type: GET_SET,
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
}
