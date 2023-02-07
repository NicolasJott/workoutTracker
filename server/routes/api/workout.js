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
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { workoutType, workout, sets, reps, time, calories } = req.body;

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newWorkout = new Workout({
                workoutType,
                workout,
                sets,
                reps,
                time,
                calories,
            });

            const workout = await newWorkout.save();

            res.json(workout);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;