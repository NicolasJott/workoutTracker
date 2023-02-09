const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Workout = require('../../models/WorkoutModel');
const User = require('../../models/UserModel');

// @route   POST api/workout
// @desc    create a workout to be logged
// @access  Private
router.post(
    '/',
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { workoutType, workout, sets, reps, time, calories, date } = req.body;

        try {
            const user = await User.findById(req.user.id).select('-password');

            let newWorkout = new Workout({
                user: req.user.id,
                workoutType,
                workout,
                sets,
                reps,
                time,
                calories,
                date,
            });

            await newWorkout.save();

            res.json(newWorkout);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/', auth, async (req, res) => {
    try {

        //Finds workouts for authed user, Will only show their data and no one else's data
        const workouts = await Workout.find({
            user: req.user.id,
            date: req.query.date
        });
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;