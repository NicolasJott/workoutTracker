import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect} from "react-redux";

import { addWorkout } from "../../actions/workout";
import {useFormInputValidation} from "react-form-input-validation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const WorkoutForm = ({ addWorkout, onFormClose, selectedDate }) => {

    const [ workoutType, setWorkoutType ] = useState("none")
    const [activeButton, setActiveButton] = useState('');

    const [fields, errors, form] = useFormInputValidation({
        workoutType: '',
        workout: '',
        numSets: '',
        time: '',
        calories: '',
    } , {
        workout: "required",
        sets: 'required',
        time: '',
        calories: '',
    });

    const { workout, numSets, time, calories } = fields

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addWorkout( { workoutType, workout, numSets, time, calories, selectedDate } )
        onFormClose();
    }
    function handleWorkoutSelection(workout) {
        setWorkoutType(workout)
        setActiveButton(workout)
        console.log(workoutType)
    }



    return(
                <div className="col-1">
                    <span className="exit-button"><FontAwesomeIcon icon={faX} onClick={onFormClose} /></span>
                    <div className="workout-block">
                        <button
                            onClick={() => handleWorkoutSelection("Weight Lifting")}
                            className={activeButton === "Weight Lifting" ? "active" : "inactive"}
                        >
                            Strength Training
                        </button>
                        <button
                            onClick={() => handleWorkoutSelection("Cardio")}
                            className={activeButton === "Cardio" ? "active" : "inactive"}
                        >
                            Cardio
                        </button>
                        <button
                            onClick={() => handleWorkoutSelection("Custom")}
                            className={activeButton === "Custom" ? "active" : "inactive"}
                        >
                            Custom
                        </button>
                    </div>
                    <form id="workoutForm" className="flex flex-col" onSubmit={handleSubmit} >
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
                        ) : (workoutType === 'Cardio') ? (
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
                        ) : (workoutType === 'Custom') && (
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