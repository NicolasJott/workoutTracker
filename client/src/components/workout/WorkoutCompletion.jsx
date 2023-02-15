import React, {useState} from "react";
import {connect} from "react-redux";
import { getSet, saveSet} from "../../actions/workout";
import PropTypes from "prop-types";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const WorkoutCompletion = ({ indexNum, workoutId, saveSet, getSet } ) => {
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        await saveSet( { reps, weight, comment }, indexNum, workoutId );
        setSubmitted(true);
    }



    return (
        <form id="workout-comment" onSubmit={handleSubmit}>
            {!submitted ? (
                <>
                    <input
                        type="text"
                        placeholder="Reps"
                        name="reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Weight (lbs)"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Notes"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {<button className="save-btn"><FontAwesomeIcon icon={faSave}/></button>}
                </>
            ) : (
                <>
                        <span>Repetitions: <p>{reps}</p></span>
                        <span>Weight:<p> {weight}</p></span>
                        <span>Notes: <p> {comment}</p></span>
                </>
            )}

        </form>

    )
}

WorkoutCompletion.propTypes = {
    saveSet: PropTypes.func.isRequired,
    getSet: PropTypes.func.isRequired,
    indexNum: PropTypes.number.isRequired,
};

export default connect(null, { saveSet, getSet })(WorkoutCompletion)