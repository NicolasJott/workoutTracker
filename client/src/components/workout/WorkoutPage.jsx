import React, {useEffect, useState} from "react";
import WorkoutForm from "./WorkoutForm";
import {Calendar} from "../calendar/Calendar";
import { getWorkouts } from "../../actions/workout";
import  WorkoutItem  from './WorkoutItem'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const WorkoutPage = ({ getWorkouts, workout: { workouts }}) => {
    const { id } = useParams();
    const [action, setAction] = useState(false);
    const [active, setActive] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date()



    const handleClick = () => {
        setAction(true)
    }

    const handleFormClose = () => {
        setAction(false)
    }

    const onCalendarChange = (date) => {
        setSelectedDate(date);
        getWorkouts(date)
    };

    useEffect(() =>{
        getWorkouts(today);
    }, [getWorkouts]);


    return (
        <div className="workout-container">
            <div className="log-container col-left">
                <div className="top">
                    <h3 className="h1-2">{selectedDate.toDateString()}</h3>
                    <h3 className="h1-2">Workout Log:</h3>
                </div>
                <div className="logs">
                    {workouts.reverse().map((workout) => (
                        <WorkoutItem key={workout._id} workout={workout}/>
                    ))}
                    {!action && (
                        <button className="workout-btn" onClick={handleClick}><FontAwesomeIcon icon={faPlusSquare} size="2xl"/></button>
                    )}
                    {action && <WorkoutForm onFormClose={handleFormClose} selectedDate={selectedDate}/>}
                    </div>
                    <div className="bottom">
                        <button className="btn bottom-btn">edit</button>
                    </div>

                </div>
            <div className="col-right">
                <Calendar currentDate={selectedDate} onDateSelection={onCalendarChange}/>
                <div className="right-box">
                    <div className="in-box"></div>
                </div>
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