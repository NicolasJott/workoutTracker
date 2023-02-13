import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WorkoutCompletion from "./WorkoutCompletion";

const WorkoutItem = ({ auth, workout: { _id, workoutType, workout, numSets, time, calories } }) => {
    if (workoutType === "Weight Lifting") {
        return (
            <div className="log-item">
            <h1 className="workout-item">{workout}</h1>
            <h4 className="workout-item">{numSets} sets</h4>
                <div>
                    {Array.from({ length: numSets }, (_, i) => (
                        <div key={i}>
                            <h4 className="workout-item">Set {i + 1}:</h4>
                            <WorkoutCompletion indexNum={i} workoutId={_id}/>
                        </div>
                    ))}
                </div>
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