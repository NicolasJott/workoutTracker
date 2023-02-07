import React from "react";
import {formatDate, getDaysInMonth } from '../utils/formatData'
import {all} from "axios";


const Workout = () => {

    const date = new Date();
    let monthNumber = date.getMonth()
    let today = date.getDate();
    const year = date.getFullYear()
    let days;


    const { month, day } = formatDate()

    days = getDaysInMonth(monthNumber, year);

    console.log(days)

    return (
        <div className="Container">
            <div className="log-container">
                <div className="calendar">
                    <div className="calendar__picture">
                        <h2>{today} , {day} </h2>
                        <h3>{month}</h3>
                    </div>
                    <div className="calendar__date">
                        <div className="calendar__day">S</div>
                        <div className="calendar__day">M</div>
                        <div className="calendar__day">T</div>
                        <div className="calendar__day">W</div>
                        <div className="calendar__day">T</div>
                        <div className="calendar__day">F</div>
                        <div className="calendar__day">S</div>
                        <div className="calendar__number"></div>
                        <div className="calendar__number"></div>
                        <div className="calendar__number"></div>
                        {days.map((d) => (
                            <div className="calendar__number">{d}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Workout;