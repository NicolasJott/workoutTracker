import React from "react";
import WorkoutForm from "./WorkoutForm";
import {Calendar} from "../calendar/Calendar";
import {formatDate} from "../../utils/formatData";



const WorkoutPage = () => {
    const date = new Date();
    let monthNumber = date.getMonth()
    let today = date.getDate();
    const year = date.getFullYear()
    let days;


    const { month, day } = formatDate()
    return (
        <div className="Container">
            <div className="log-container">
                <div className="top">
                    <h1 className="h1-2">{day}, {month}  {today}</h1>
                    <h1 className="h1-2">Workout Log:</h1>
                </div>
                <div className="logs">
                    Log goes here
                </div>
                <div className="bottom">
                    <button className="btn">Add New Workout</button>
                </div>


            </div>
        </div>

    );
}

export default WorkoutPage;