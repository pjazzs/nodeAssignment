const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    articleName: {
        type: String,
        require: [true, "please enter email"],
        unique: true,
        trim: true
    },

    subjectOfArticle: {
        type: String,
        require: true
    },

    author: {
        type: String,
        require: true
    },

    authorQualification: {
        type: String,
        require: true
    },

    addressOfAuthor: {
        type: String,
        require: true
    }

}, {timestamps: true})

const Article = mongoose.model("Article", articleSchema)

module.exports =Article