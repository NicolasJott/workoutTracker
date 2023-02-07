import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const WorkoutItem = ({ auth, workout: { workoutType, workout, sets, reps, time, calories }}) => (
    <div>
        <p className="workout-item">Workout type: {workoutType}</p>
        <p className="workout-item">Workout: {workout}</p>
        <p className="workout-item">Number of Sets: {sets}</p>
        <p className="workout-item">Number of Reps: {reps}</p>
        <p className="workout-item">Amount of time: {time}</p>
        <p className="workout-item">Calories Burned: {calories}</p>
    </div>
)

WorkoutItem.defaultProps = {
    showActions: true,
};

WorkoutItem.propTypes = {
    workout: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {  })(WorkoutItem);