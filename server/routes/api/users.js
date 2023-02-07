const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config()
const User = require('../../models/UserModel');

// For checking if a string is blank, null or undefined
const isBlank = (str) => !str || /^\s*$/.test(str);

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/',
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with minimum of 6 characters'
    ).isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Exists!' }] });
            }



            user = new User({
                firstName,
                lastName,
                email,
                password,
            });

            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE * 30 * 60 * 60  }, // Change to 3600 during production
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;