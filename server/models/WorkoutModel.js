const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    workoutType: {
        type: String,
        required: true,
    },
    workout: {
        type: String,
        required: true
    },
    sets: {
        type: String,
    },
    reps: {
        type: String
    },
    time: {
        type: String
    },
    calories: {
        type: String
    }

});


module.exports = mongoose.model("workoutLog", userSchema)