

export const  formatDate = (monthNumber, day, year) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[monthNumber];
    const d = new Date(year, monthNumber, day);
    const weekday = d.toLocaleString('default', { weekday: 'long' });

    return { month, weekday };
}

export const getDaysInMonth = (month, year) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days = [];
    if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            days = [...Array(29).keys()].map(i => i + 1);
            return days;
        }
    }
    days = [...Array(daysInMonth[month]).keys()].map(i => i + 1);
    return days;
}



