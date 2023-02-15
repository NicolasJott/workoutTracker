import React from "react";
import PropTypes from "prop-types";
import { connect} from "react-redux";

import { addWorkout } from "../../actions/workout";
import {useFormInputValidation} from "react-form-input-validation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const WorkoutForm = ({ addWorkout, onFormClose, selectedDate }) => {
    const [fields, errors, form] = useFormInputValidation({
        workoutType: '',
        workout: '',
        numSets: '',
        time: '',
        calories: '',
    } , {
        workoutType: "required",
        workout: "required",
        sets: 'required',
        time: '',
        calories: '',
    });

    const { workoutType, workout, numSets, time, calories } = fields

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addWorkout( { workoutType, workout, numSets, time, calories, selectedDate } )
        onFormClose();
    }

    return(
                <div className="col-1">
                    <span className="exit-button"><FontAwesomeIcon icon={faX} onClick={onFormClose} /></span>
                    <form id="workoutForm" className="flex flex-col" onSubmit={handleSubmit} >
                        <select
                            value={workoutType}
                            name="workoutType"
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        >
                            <option value="">{errors.workoutType ? errors.workoutType : "Select a Workout"}</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Weight Lifting">Weight Lifting</option>
                        </select>
                        {(workoutType === 'Weight Lifting') ? (
                            <>
                                <input
                                    type='text'
                                    placeholder={errors.workout ? errors.workout : "Workout Name"}
                                    name='workout'
                                    value={fields.workout}
                                    onChange={form.handleChangeEvent}
                                    onBlur={form.handleBlurEvent}
                                    required
                                />
                            <input
                                type='text'
                                placeholder={errors.numSets ? errors.numSets : "Number of Sets"}
                                name='numSets'
                                value={fields.numSets}
                                onChange={form.handleChangeEvent}
                                onBlur={form.handleBlurEvent}
                                required
                            />
                                </>
                        ) : (workoutType === 'Cardio') && (
                            <>
                                <input
                                    type='text'
                                    placeholder={errors.workout ? errors.workout : "Workout Name"}
                                    name='workout'
                                    value={fields.workout}
                                    onChange={form.handleChangeEvent}
                                    onBlur={form.handleBlurEvent}
                                    required
                                />
                            <input
                            type='text'
                            placeholder={errors.time ? errors.time : "Amount of Time (Minutes)"}
                            name='time'
                            value={fields.time}
                            onChange={form.handleChangeEvent}
                            />
                            <input
                            type='text'
                            placeholder={errors.calories ? errors.calories : "Calories Burned"}
                            name='calories'
                            value={fields.calories}
                            onChange={form.handleChangeEvent}
                            />
                            </>
                        )}
                        <button className="btn">Add Workout</button>
                    </form>
                </div>
    )
};

WorkoutForm.propTypes = {
    addWorkout: PropTypes.func.isRequired,
};

export default connect(null, { addWorkout, })(WorkoutForm)