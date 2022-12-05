const express = require('express');
const app = express()
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const path = require('path');
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(cors())
require('./models/studentModel')

app.use(express.json())
app.use(require("./routes/studentRoutes"))
app.use(require("./routes/blogs"))

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


//serving the frontend
app.use(express.static(path.join(__dirname, "./frontent/build")))

app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "./frontent/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})