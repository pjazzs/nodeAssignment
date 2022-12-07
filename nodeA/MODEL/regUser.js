const mongoose = require("mongoose")

const userRegSchema = new mongoose.Schema({
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
    },

    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    }

}, {timestamps: true})

const RegUser = mongoose.model("Register", userRegSchema)

module.exports =RegUser