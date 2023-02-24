import React, {useRef, useState} from "react";
import { connect } from "react-redux";
import { saveSet } from "../../actions/workout";
import PropTypes from "prop-types";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkoutCompletion = ({indexNum, workoutId, saveSet, onSubmission, placeholders}) => {
    const [reps, setReps] = useState(placeholders.reps || "");
    const [weight, setWeight] = useState(placeholders.weight || "");
    const [comment, setComment] = useState(placeholders.comment || "");
    const clickedOutsideForm = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (reps.trim() === '' || weight.trim() === '' || comment.trim() === '') {
            return;
        }
        await saveSet({ reps, weight, comment }, indexNum, workoutId);
        onSubmission();
    };


    return (
        <form id="workout-comment" onBlur={handleSubmit} onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder={placeholders.reps ? placeholders.reps : "Reps"}
                name="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
            />
            <input
                type="text"
                placeholder={placeholders.weight ? placeholders.weight : "Weight"}
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <input
                type="text"
                placeholder="Notes"
                name={placeholders.comment ? placeholders.comment : "Notes"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="save-btn">
                <FontAwesomeIcon icon={faSave} />
            </button>
        </form>
    );
};

WorkoutCompletion.propTypes = {
    saveSet: PropTypes.func.isRequired,
    indexNum: PropTypes.number.isRequired,
};

export default connect(null, { saveSet })(WorkoutCompletion);