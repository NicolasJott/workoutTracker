import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const WorkoutItem = ({ auth, workout: { workoutType, workout, sets, reps, time, calories } }) => {

    if (workoutType === "Weight Lifting") {
        return (
            <div className="log-item">
            <h1 className="workout-item">{workout}</h1>
            <h4 className="workout-item">{sets} sets</h4>
            <h4 className="workout-item">{reps} reps</h4>
            <hr/>
        </div>
        )
    }

    return (
        <div className="log-item">
            <h1 className="workout-item">{workout}</h1>
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

};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {  })(WorkoutItem);