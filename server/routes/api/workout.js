const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Workout = require('../../models/WorkoutModel');
const User = require('../../models/UserModel');
const mongoose = require("mongoose");

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

        const { workoutType, workout, numSets, time, calories, date } = req.body;

        try {
            const user = await User.findById(req.user.id).select('-password');

            let set_items = [];

            for (let i = 0; i < numSets; i++) {
                set_items.push([])
            }

            let newWorkout = new Workout({
                user: user.id,
                workoutType,
                workout,
                numSets,
                set_items,
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

router.delete('/:id', auth, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await workout.remove();

        res.json({ msg: 'Workout Removed '});
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/workout
// @desc    edit a set inside a workout
// @access  Private
router.put('/:id/:setIndex', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { reps, weight, comment } = req.body;
    const { id, setIndex } = req.params;

    try {
        const user = await User.findById(req.user.id).select('-password');
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found'});
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'});
        }

        if (setIndex < 0 || setIndex >= workout.set_items.length) {
            return res.status(400).json({ msg: 'Invalid set index' });
        }

        workout.set_items[setIndex]=
            {
                reps,
                weight,
                comment,
            }

        await workout.save();

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/workout
// @desc    add a new set to a workout
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;

    try {
        const user = await User.findById(req.user.id).select('-password');
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found'});
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'});
        }

        const newSetItem = {

        };

        workout.set_items.push(newSetItem);
        workout.numSets += 1;

        await workout.save();

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/workout
// @desc    delete a set inside a workout
// @access  Private

router.delete('/:id/:setIndex', auth, async (req, res) => {
    const { id, setIndex } = req.params;

    try {
        const user = await User.findById(req.user.id).select('-password');
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found'});
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'});
        }

        if (setIndex < 0 || setIndex >= workout.set_items.length) {
            return res.status(400).json({ msg: 'Invalid set index' });
        }

        workout.set_items.splice(setIndex, 1);
        workout.numSets -= 1;
        await workout.save();

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;