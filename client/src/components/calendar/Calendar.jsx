import {formatDate, getDaysInMonth} from "../../utils/formatData";
import { useState} from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const Calendar = ({ currentDate, onDateSelection, onCalendarClose }) => {
    const [date, setDate] = useState(currentDate || new Date());
    const [monthNumber, setMonthNumber]  = useState(date.getMonth())
    let today = date.getDate();
    const [year, setYear] = useState(date.getFullYear())
    const [selectedDay, setSelectedDay] = useState(today)


    const handleDaySelection = (day) => {
        setSelectedDay(day);
        onDateSelection(new Date(currentDate.getFullYear(), monthNumber, day))
        onCalendarClose();
    }

    const nextMonth = () => {
        setMonthNumber((monthNumber + 1) % 12)
        if (monthNumber === 11) {
            setYear(year + 1);
        }
    }

    const prevMonth = () => {
        setMonthNumber((monthNumber + 11) % 12)
        if (monthNumber === 0) {
            setYear(year - 1)
        }
    }


    const { month, weekday } = formatDate(monthNumber, selectedDay, year)
    let days = getDaysInMonth(monthNumber, year);
    const startDay = new Date(year, monthNumber, 1).getDay();


    return(
        <div className="calendar">
            <div className="calendar__picture">
                <div className="close-calendar">
                    <FontAwesomeIcon icon={faClose} onClick={onCalendarClose}/>
                </div>
                <h2>{selectedDay} , {weekday} {year} </h2>
                <div className="calendar-month">
                    <i className="fa fa-fw fa-chevron-left" onClick={prevMonth}></i>
                    <h3>{month}</h3>
                    <i className="fa fa-fw fa-chevron-right" onClick={nextMonth}></i>
                </div>



            </div>
            <div className="calendar__date">
                <div className="calendar__day">S</div>
                <div className="calendar__day">M</div>
                <div className="calendar__day">T</div>
                <div className="calendar__day">W</div>
                <div className="calendar__day">T</div>
                <div className="calendar__day">F</div>
                <div className="calendar__day">S</div>
                {[...Array(startDay).keys()].map(() => (
                    <div className="calendar__number"></div>
                ))}
                {days.map((d) => (
                    <div className={`calendar__number ${d === selectedDay ? 'highlight' : ''}`} onClick={() => handleDaySelection(d)} >{d}</div>
                ))}
            </div>
        </div>
    );
}