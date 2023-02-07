

export const  formatDate = () => {
    const months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]
    const date = new Date()
    const monthData = date.getMonth()
    const dayData = date.getDay()
    let month, day;
    for (let i = 0; i < months.length; i++){
        if (monthData === i) {
            month = months[i]
        }
    }
    for (let i = 0; i < days.length; i++){
        if (dayData - 1 === i) {
            day = days[i]
        }
    }

    return { month, day }
}

export const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = []
    while (date.getMonth() === month ){
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1)
    }
    return days;
}



