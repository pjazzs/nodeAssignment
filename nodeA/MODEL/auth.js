const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

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

const authReg = mongoose.model("authUser", authSchema)

module.exports = authReg