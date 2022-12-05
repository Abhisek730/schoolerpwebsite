const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const csvtojson = require("csvtojson")

const student = mongoose.model("student");

// router.post("/add", (req, res) => {
//     csvtojson()
//         .fromFile("sampe11.csv")
//         .then(csvdata => {
//             res.json(csvdata)
//         })
// })
router.get('/dash', (req, res) => {
    student.find()
        .then(data => { res.json(data) })
})

// to register student
router.post("/register", (req, res) => {
    const {
        student_name,
        classname,
        parents_name,
        section,
        addmission_no,
        age,
    } = req.body;

    if (!student_name || !classname || !parents_name || !section || !addmission_no || !age) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    student.findOne({ addmission_no }).then((savedStudent) => {
        if (savedStudent) {
            return res.status(422).json({ error: "Student already exist with that addmission number" })
        }
    })

    const new_student = new student({
        student_name,
        classname,
        roll_no: addmission_no,
        parents_name,
        age,
        section
    })
    new_student.save()
        .then(user => { res.json({ message: "Registered successfully" }) })
        .catch(err => { console.log(err) })
    console.log(new_student)
})

router.get("/mystuds", (req, res) => {


    student.find({ Class: req.headers.class, Section: req.headers.section })
        .sort({ 'First_Name': 1 })
        .then(mystuds => {
            res.json(mystuds)
        })
})

module.exports = router