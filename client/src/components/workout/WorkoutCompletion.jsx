import {useState} from "react";
import {connect} from "react-redux";
import {addWorkout} from "../../actions/workout";

const WorkoutCompletion = ({}) => {
    const [reps, setReps] = useState()
    const [weight, setWeight] = useState()
    const [comment, setComment] = useState()

    return (
        <form id="workout-comment">
            <input
                type="text"
                placeholder="Number of reps"
                name="reps"
                value={reps}
            />
            <input
                type="text"
                placeholder="Amount of weight"
                name="weight"
                value={weight}
            />
            <input
                type="text"
                placeholder="Comments"
                name="comment"
                value={comment}
            />
        </form>

    )
}

export default connect(null)(WorkoutCompletion)