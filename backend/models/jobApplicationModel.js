const mongoose = require("mongoose")

const jobApplicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone_no:{
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    document: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxlength: 500,
    }
})

const jobApplicationModel = mongoose.model("Job", jobApplicationSchema)

module.exports = jobApplicationModel