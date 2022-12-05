const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const mongoose = require('mongoose')
const student = mongoose.model("student");
const alert = require("alert")


exports.create = async (req, res, next) => {
    console.log(req.file)
    const allrecords = []
    try {
        fs.createReadStream(path.join(__dirname, "../", "uploads/" + req.file.filename))
            .pipe(csv.parse({ headers: true }))
            .on('error', err => console.log(err))
            .on('data', row => allrecords.push(row))
            .on('end', async rowCount => {
                console.log(rowCount + "rows has been parsed")
                try {
                    const users = await student.insertMany(allrecords)
                    console.log("users succesfully created")
                    alert("Students added to database")
                    res.redirect('http://localhost:3000/');

                } catch (err) {
                    return res.status(404).json(err)
                }
            })
    } catch (error) {
        return res.status(404).json(error)
    }


    next()

}