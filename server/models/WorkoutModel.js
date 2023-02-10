const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new mongoose.Schema({
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
    numSets: {
        type: String,
    },
    sets: [
        {
        reps: { type: String },
        weight: { type: String },
        comment: { type: String },
    }
    ],
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


module.exports = Workout = mongoose.model("workout_logs", WorkoutSchema);