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

        const { workoutType, workout, sets, reps, time, calories } = req.body;

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
            });

            await newWorkout.save();

            res.json(newWorkout);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;