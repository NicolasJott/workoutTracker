import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import WorkoutCompletion from "./WorkoutCompletion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {deleteWorkout} from "../../actions/workout";
import React, {useReducer, useState} from "react";
import {addSet} from "../../actions/workout";
import Spinner from "../layout/Spinner";

const WorkoutItem = ({ auth, deleteWorkout, addSet,  workout: { _id, workoutType, numSets, workout, set_items, time, calories } }) => {

    const [sets, setSets] = useState(numSets)

    const handleDelete = () => {
        deleteWorkout(_id)
    }

    const handleAddSet = async() => {
        addSet(sets, _id)
        setSets(sets + 1);
    }


    if (!workout) {
        return (
            <div>
                <Spinner />
            </div>

        )
    }

    if (workoutType === "Weight Lifting") {
        return (
            <div className="log-item">
                <div className="workout-header">
                    <h1 className="workout-item">{workout}</h1>
                    <button className="delete-btn" onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></button>
                </div>

            <h4 className="workout-item">{sets} sets</h4>
                <div>
                    {Array.from({ length: sets }, (_, i) => (
                        <div key={i}>
                            <h4 className="workout-item">Set {i + 1}:</h4>
                            {set_items[i] ? (
                                <div className="saved-set">
                                    <span>Repetitions: <p>{set_items[i].reps}</p></span>
                                    <span>Weight:<p> {set_items[i].weight}</p></span>
                                    <span>Notes: <p> {set_items[i].comment}</p></span>
                                </div>
                            ) : (
                                <WorkoutCompletion indexNum={i} workoutId={_id}/>
                            )}
                        </div>
                    ))}
                    <div className="add-set">
                        <button className="add-set-btn" onClick={handleAddSet} ><FontAwesomeIcon icon={faPlusSquare} size="sm"/></button><p> Add Set </p>
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
    deleteWorkout: PropTypes.func.isRequired,
    addSet: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { deleteWorkout, addSet })(WorkoutItem);