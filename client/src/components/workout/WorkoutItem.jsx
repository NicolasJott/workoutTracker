import PropTypes from "prop-types";
import { connect } from "react-redux";
import WorkoutCompletion from "./WorkoutCompletion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {deleteWorkout} from "../../actions/workout";

const WorkoutItem = ({ auth, deleteWorkout, workout: { _id, workoutType, workout, set_items, numSets, time, calories } }) => {


    const handleDelete = () => {
        deleteWorkout(_id)
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
                    {Array.from({ length: numSets }, (_, i) => (
                        <div key={i}>
                            <h4 className="workout-item">Set {i + 1}:</h4>
                            {set_items[i] ? (
                                <div className="saved-set">
                                    <p>Repetitions: {set_items[i].reps}</p>
                                    <p>Weight: {set_items[i].weight}</p>
                                    <p>Notes: {set_items[i].comment}</p>
                                </div>
                            ) : (
                                <WorkoutCompletion indexNum={i} workoutId={_id}/>
                            )}
                        </div>
                    ))}
                </div>
            <hr/>
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
    deleteWorkout: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { deleteWorkout })(WorkoutItem);