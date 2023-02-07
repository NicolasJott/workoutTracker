

function formatDate(month, day ) {
    const months = ["January", "February", "March", "April", "May","June", "July", "August", "September", "October", "November", "December"]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]
    const date = new Date()
    const monthData = date.getMonth()
    const dayData = date.getDay()
    for (let i = 0; i < months.length; i++){
        if (monthData === i) {
            month = months[i]
        }
    }
    for (let i = 0; i < days.length; i++){
        if (dayData === i) {
            day = days[i]
        }
    }

    return { month, day }
}

export default formatDate