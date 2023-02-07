import React, { useState} from "react";
import PropTypes from "prop-types";
import { connect} from "react-redux";

import { addWorkout } from "../../actions/workout";
import {useFormInputValidation} from "react-form-input-validation";

const WorkoutForm = ({ addWorkout, onFormClose }) => {
    const [fields, errors, form] = useFormInputValidation({
        workoutType: '',
        workout: '',
        sets: '',
        reps: '',
        time: '',
        calories: '',
    } , {
        workoutType: "required",
        workout: "required",
        sets: 'required',
        reps: 'required',
        time: '',
        calories: '',
    });

    const { workoutType, workout, sets, reps, time, calories } = fields

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addWorkout( { workoutType, workout, sets, reps, time, calories } )
        onFormClose();
    }

    return(

                <div className="col-1">
                    <div className="top">
                        <button className="btn" onClick={onFormClose}>Exit</button>
                    </div>
                    <h2>Add a Workout</h2>
                    <form id="form" className="flex flex-col" onSubmit={handleSubmit} >
                        <input
                            type='text'
                            placeholder='Workout Type'
                            name='workoutType'
                            value={fields.workoutType}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.workoutType ? errors.workoutType : ""}</span>
                        <input
                            type='text'
                            placeholder='Workout Name'
                            name='workout'
                            value={fields.workout}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.workout ? errors.workout : ""}</span>
                        <input
                            type='text'
                            placeholder='Number of Sets'
                            name='sets'
                            value={fields.sets}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.sets ? errors.sets : ""}</span>
                        <input
                            type='text'
                            placeholder='Number of Reps'
                            name='reps'
                            value={fields.reps}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.reps ? errors.reps : ""}</span>
                        <input
                            type='text'
                            placeholder='Amount of Time'
                            name='time'
                            value={fields.time}
                            onChange={form.handleChangeEvent}
                        />
                        <span className="error">{errors.time ? errors.time : ""}</span>
                        <input
                            type='text'
                            placeholder='Calories Burned'
                            name='calories'
                            value={fields.calories}
                            onChange={form.handleChangeEvent}
                        />
                        <span className="error">{errors.calories ? errors.calories : ""}</span>
                        <button className="btn">Add Workout</button>
                    </form>
                </div>
    )
};

WorkoutForm.propTypes = {
    addWorkout: PropTypes.func.isRequired,
};

export default connect(null, { addWorkout, })(WorkoutForm)