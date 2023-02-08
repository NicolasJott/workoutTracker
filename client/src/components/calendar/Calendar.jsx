import {formatDate, getDaysInMonth} from "../../utils/formatData";


export const Calendar = ({ onCalendarClose }) => {

    const date = new Date();
    let monthNumber = date.getMonth()
    let today = date.getDate();
    const year = date.getFullYear()
    let days;


    const { month, day } = formatDate()

    days = getDaysInMonth(monthNumber, year);

    const handleClick = () => {
        console.log('click')
        onCalendarClose();
    }


    return(
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
                    <div className="calendar__number" ><h2 onClick={handleClick}>{d}</h2></div>
                ))}
            </div>
        </div>
    );
}