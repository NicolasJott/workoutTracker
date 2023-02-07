const User = require('../models/userModel');
const catchAsync = require('../middleware/catchAsync');
const sendCookie = require('../utils/sendCookie');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require("jsonwebtoken");

exports.signupUser = catchAsync(async (req, res, next) => {

    const {  email, password } = req.body;

    const user = await User.findOne({
         email
    });

    if (user) {
        return next(new ErrorHandler("Email already exists", 401));
    }

    const newUser = await User.create({
        email,
        password,
    })

    sendCookie(newUser, 201, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }


    jwt.sign(
        {},
        process.env.JWT_SECRET,
        { expiresIn: 360000 }, // Change to 3600 during production
        (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    sendCookie(user, 201, res);
});

exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

});

exports.getAccountDetails = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user._id)


    res.status(200).json({
        success: true,
        user,
    });
});
