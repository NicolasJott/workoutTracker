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
        type: Number,
    },
    set_items: [{
        reps: String,
        weight: String,
        comment: String,
    }],
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


module.exports = Workout = mongoose.model("workout", WorkoutSchema);