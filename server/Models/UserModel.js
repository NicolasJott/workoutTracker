const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"],
    },
    password:{
        type: String,
        required:[true, "Password is Required"],
        minlength: [6, "Password must be of minimum 6 characters"],
    },
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model("User", userSchema)