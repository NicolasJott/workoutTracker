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

        const { workoutType, workout, numSets, time, calories, date } = req.body;

        try {
            const user = await User.findById(req.user.id).select('-password');

            let newWorkout = new Workout({
                user: user.id,
                workoutType,
                workout,
                numSets,
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

router.post('/set/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { index_num, reps, weight, comment } = req.body;

    try {
        const workout = await Workout.findById(req.params.id);

        const newSet = {
            index_num,
            reps,
            weight,
            comment,
        };

        workout.set_items.push(newSet);

        await workout.save();

        res.json(workout.set_items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/set/:id/', auth, async(req, res) => {
    try{
        const workout = await Workout.findOne( {_id: req.params.id} ) ;
        const i = req.query.index;
        res.json(workout.set_items[i])

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }




})
module.exports = router;