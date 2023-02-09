const mongoose = require("mongoose")
const {Schema} = require("mongoose");


const userSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
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
    },
    date:{
        type: String,
        required: true
    },

});


module.exports = mongoose.model("workout_logs", userSchema)