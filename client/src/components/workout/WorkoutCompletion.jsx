import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { addSet, getSet } from "../../actions/workout";
import PropTypes from "prop-types";

const WorkoutCompletion = ({ indexNum, workoutId, addSet, getSet } ) => {
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        const i = indexNum.toString()
        e.preventDefault()
        await addSet( { i, reps, weight, comment }, workoutId );
        setSubmitted(true);
    }


    return (
        <form id="workout-comment" onSubmit={handleSubmit}>
            {!submitted ? (
                <>
                    <input
                        type="text"
                        placeholder="Number of reps"
                        name="reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Amount of weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Comments"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn"> save </button>
                </>
            ) : (
                <>
                    <p>Repetitions: {reps}</p>
                    <p>Weight: {weight}</p>
                    <p>Notes: {comment}</p>
                </>
            )}

        </form>

    )
}

WorkoutCompletion.propTypes = {
    addSet: PropTypes.func.isRequired,
    getSet: PropTypes.func.isRequired,
    indexNum: PropTypes.number.isRequired,
};

export default connect(null, { addSet, getSet })(WorkoutCompletion)