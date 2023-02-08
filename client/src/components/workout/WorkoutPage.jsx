import React, {useEffect, useState} from "react";
import WorkoutForm from "./WorkoutForm";
import {Calendar} from "../calendar/Calendar";
import {formatDate} from "../../utils/formatData";
import { getWorkouts } from "../../actions/workout";
import  WorkoutItem  from './WorkoutItem'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";


const WorkoutPage = ({ getWorkouts, workout: { workouts }}) => {
    const { id } = useParams();
    const [action, setAction] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() =>{
        getWorkouts();
        }, [getWorkouts]);

    const date = new Date();
    let today = date.getDate();

    const handleClick = () => {
        setAction(true)
    }

    const handleCalendar = () => {
        setActive(true)
    }

    const handleCalendarClose = () => {
        setActive(false)
    }

    const handleFormClose = () => {
        setAction(false)
    }


    const { month, day } = formatDate()
    return (
        <div className="Container">
            <div className="log-container">
            {!action && !active && (
                <>
                <div className="top">
                    <h1 className="h1-2" onClick={handleCalendar} >{day}, {month} {today}</h1>
                    <h1 className="h1-2">Workout Log:</h1>
                </div>
                <div className="logs">
                    {workouts.map((workout) => (
                        <WorkoutItem key={workout._id} workout={workout}/>
                    ))}
                    </div>
                    <div className="bottom">
                        <button className="btn" onClick={handleClick}>Add New Workout</button>
                    </div>
                </>
                )}
                {action && <WorkoutForm onFormClose={handleFormClose} />}
                {active && <Calendar onCalendarClose={handleCalendarClose} />}
                </div>
            </div>

    );
}

WorkoutPage.propTypes = {
    getWorkouts: PropTypes.func.isRequired,
    workout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ workout: state.workout });

export default connect(mapStateToProps, { getWorkouts })(WorkoutPage);