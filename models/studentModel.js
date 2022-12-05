const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        First_Name: {
            type: String,
            required: true,
        },
        Class: {
            type: String,
            required: true,
        },
        Section: {
            type: String,
            required: true
        },

        Admission_No: {
            type: Number,
            require: true
        },
        Father_Name: {
            type: String,

        },
        Mother_Name: {
            type: String,

        },
        Address: {
            type: String,

        },
        Father_Mobile: {
            type: String,

        },
        Admission_Date: {
            type: String,
            required: true,
        },
        DOB: {
            type: String,

        },

    },
    {
        timestamps: true,
    }
)
//the below is required code for converting the schema to the model
//as per the documentation of mongoose
//any name can be given as a constant in the place of the Student
mongoose.model('student', studentSchema)
//Student variable is exported as follow is a ES module.
