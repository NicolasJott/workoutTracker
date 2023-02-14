import React, {useEffect, useState} from "react";
import WorkoutForm from "./WorkoutForm";
import {Calendar} from "../calendar/Calendar";
import { getWorkouts } from "../../actions/workout";
import  WorkoutItem  from './WorkoutItem'
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { faPlusSquare, faCalendar } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const today = new Date()

const WorkoutPage = ({ getWorkouts, workout: { workouts }}) => {
    const [action, setAction] = useState(false);
    const [active, setActive] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);




    const handleClick = () => {
        setAction(true)
    }

    const handleFormClose = () => {
        setAction(false)
        getWorkouts(today);
    }

    const handleCalendarOpen = () => {
        setActive(true)
    }

    const handleCalendarClose = () => {
        setActive(false)
    }

    const onCalendarChange = (date) => {
        setSelectedDate(date);
        getWorkouts(date)
    };


    useEffect(() =>{
        getWorkouts(today);
    }, [getWorkouts]);


    return (
        <section>
            <div className="workout-container">
            <div className=" workout-log col-left">
                {!active ? (
                    <>
                        <div className="top">
                            <h3 className="h1-2" >{selectedDate.toDateString()}</h3>
                            <div className="calendarIcon">
                                <FontAwesomeIcon icon={faCalendar} size="2xl" onClick={handleCalendarOpen}/>
                            </div>

                            <h3 className="h1-2">Workout Log:</h3>
                        </div>
                        <div className="logs">
                            { workouts && workouts.length > 0 && workouts.map((workout) => (
                                <>
                                    <WorkoutItem workoutId={workout._id} workout={workout} />

                                </>


                            ))}
                            {!action && (
                                <button className="workout-btn" onClick={handleClick}><FontAwesomeIcon icon={faPlusSquare} size="2xl"/></button>
                            )}
                            {action && <WorkoutForm onFormClose={handleFormClose} selectedDate={selectedDate}/>}
                        </div>
                    </>
                ) : (
                    <Calendar currentDate={selectedDate} onCalendarClose={handleCalendarClose} onDateSelection={onCalendarChange}/>
                )}
            </div>
            <div className="col-right">
                <Calendar currentDate={selectedDate} onDateSelection={onCalendarChange}/>
                <div className="right-box">
                    <div className="in-box"></div>
                </div>
            </div>
        </div>
        </section>


    );
}

WorkoutPage.propTypes = {
    getWorkouts: PropTypes.func.isRequired,
    workout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ workout: state.workout });

export default connect(mapStateToProps, { getWorkouts })(WorkoutPage);