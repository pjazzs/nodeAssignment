const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "please enter email"],
        unique: true,
        trim: true
    },

    password: {
        type: String,
        require: [true, "password field is empty!"]
    },

    confrim_password: {
        type: String,
        require: [true, "confrim your password"]
    }
}, {timestamps: true})

const UserLog = mongoose.model("UserDb", userSchema)

module.exports = UserLog