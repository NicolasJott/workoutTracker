import React from "react";
import formatDate from '../utils/formatData'


const Workout = () => {

    const date = new Date();
    let month1 = date.getMonth()
    let day1 = date.getDay()
    let today = date.getDate();
    const year = date.getFullYear()
    let allDate = new Date(year, month1, 1)
    let days = []

    const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
    console.log(getDaysInMonth(month1 + 1, year).toString())
    while (date.getMonth() === month1) {
        days.push(new Date(allDate).getDate())
        date.setDate(date.getDate() + 1)
    }

    const { month, day } = formatDate(month1, day1)
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

                        <div className="calendar__day">M</div>
                        <div className="calendar__day">T</div>
                        <div className="calendar__day">W</div>
                        <div className="calendar__day">T</div>
                        <div className="calendar__day">F</div>
                        <div className="calendar__day">S</div>
                        <div className="calendar__day">S</div>
                        <div className="calendar__number"></div>
                        <div className="calendar__number"></div>
                        <div className="calendar__number"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Workout;