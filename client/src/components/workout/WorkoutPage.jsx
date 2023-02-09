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
            {!action && !active && (
                <>
                <div className="top">
                    <h1 className="h1-2">{selectedDate.toDateString()}</h1>
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
                {action && <WorkoutForm onFormClose={handleFormClose} selectedDate={selectedDate}/>}
                </div>
            <div className="col-right">
                <Calendar currentDate={selectedDate} onDateSelection={onCalendarChange}/>
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