import api from '../utils/api';
import {ADD_SET, ADD_WORKOUT, DELETE_SET, DELETE_WORKOUT, GET_WORKOUTS, LOG_ERROR, SAVE_SET} from "./types";
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

export const deleteWorkout = (id) => async (dispatch) => {
    try {
        await api.delete(`/workout/${id}`);

        dispatch({
            type: DELETE_WORKOUT,
            payload: id,
        });

        dispatch(setAlert('Workout Removed', 'success'));
    } catch (err) {
        dispatch({
            type: LOG_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            }
        })
    }
}

export const saveSet = ({  reps, weight, numSets, comment}, indexNum, workoutId) => async (dispatch) => {

    const body = { reps, weight, numSets, comment };

    try {
        const res = await api.put(`/workout/${workoutId}/${indexNum}`, body);

        dispatch({
            type: SAVE_SET,
            payload: res.data,
        });

        dispatch(setAlert('Set Saved', 'success'));
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

export const addSet = ( workoutId) => async (dispatch) => {

    try{
        const res = await api.put(`/workout/${workoutId}`);

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

export const deleteSet = (workoutId, indexNum) => async (dispatch) => {

    try {
        await api.delete(`/workout/${workoutId}/${indexNum}`)

        dispatch({
            type: DELETE_SET,
            payload: workoutId
        })


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
