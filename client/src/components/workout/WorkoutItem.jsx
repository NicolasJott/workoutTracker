import PropTypes from "prop-types";
import {connect} from "react-redux";
import WorkoutCompletion from "./WorkoutCompletion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faTrash, faEdit, faMinusSquare} from "@fortawesome/free-solid-svg-icons";
import {deleteSet, deleteWorkout, getWorkouts, saveSet} from "../../actions/workout";
import React, {useState} from "react";
import {addSet} from "../../actions/workout";
import Spinner from "../layout/Spinner";

const WorkoutItem = ({ auth, deleteWorkout, getWorkouts, date, addSet, saveSet, deleteSet,  workout: { _id, workoutType, numSets, workout, set_items, time, calories } }) => {

    const [submitted, setSubmitted] = useState({})

    const handleEdit = async (i) => {
        setSubmitted((prevState) => ({
            ...prevState,
            [i]: !prevState[i],
        }));
    }

    const handleDelete = async() => {
        deleteWorkout(_id)
    }

    const handleFormSubmit = async (i) => {
        await getWorkouts(date);

        setSubmitted((prevState) => ({
            ...prevState,
            [i]: false,
        }));
    }
    const handleAddSet = async() => {
        await addSet(_id)
        await getWorkouts(date);
    }

    const handleRemoveSet = async(i) => {
        await deleteSet(_id, i);
        await getWorkouts(date);
    }


    if (!workout) {
        return (
                <Spinner />
        )
    }
    if (workoutType === "Weight Lifting") {
        return (
            <div className="log-item">
                <div className="workout-header">
                    <h1 className="workout-item">{workout}</h1>
                    <button className="delete-btn" onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></button>
                </div>

            <h4 className="workout-item">{numSets} sets</h4>
                <div>
                    {set_items.map((set, i) =>
                    <div>
                        <h4 className="workout-item">Set {i + 1}:</h4>
                            {Object.keys(set).length > 1 && !submitted[i] ? (
                                <div className="saved-set">
                                    <span>Repetitions: <p>{set.reps}</p></span>
                                    <span>Weight:<p> {set.weight}</p></span>
                                    <span>Notes: <p> {set.comment}</p></span>
                                    <button className="delete-btn" onClick={() => handleEdit(i)}><FontAwesomeIcon icon={faEdit}/></button>
                                </div>
                            ) : (
                                <WorkoutCompletion indexNum={i} workoutId={_id} onSubmission={() => handleFormSubmit(i)} placeholders={set}/>
                            )}
                        <button className="add-set-btn" onClick={() => handleRemoveSet(i)} ><FontAwesomeIcon icon={faMinusSquare} size="lg"/></button>
                    </div>
                    )}
                    <div className="add-set">
                        <button className="add-set-btn" onClick={handleAddSet} ><FontAwesomeIcon icon={faPlusSquare} size="lg"/></button>
                    </div>
                </div>
        </div>
        )
    }

    return (
        <div className="log-item">
            <div className="workout-header">
                <h1 className="workout-item">{workout}</h1>
                <button className="delete-btn" onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
            <h4 className="workout-item">{time} Minutes</h4>
            <h4 className="workout-item">{calories} Calories Burned</h4>
            <hr/>
        </div>
    )

}

WorkoutItem.defaultProps = {
    showActions: true,
};

WorkoutItem.propTypes = {
    workout: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    saveSet: PropTypes.func.isRequired,
    getWorkouts: PropTypes.func.isRequired,
    deleteWorkout: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
    addSet: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { deleteWorkout, addSet, getWorkouts, deleteSet, saveSet })(WorkoutItem);