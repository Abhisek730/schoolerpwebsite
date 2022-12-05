const express = require("express");
const router = express.Router()
const multer = require("multer");
const csvController = require("../controllers/csvController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get("/upload", (req, res, next) => {
    res.send("hello")
})

router.post("/uploadFile", upload.single("dataSheet"), csvController.create, function (req, res, next) {
    var fileinfo = req.file;
    var title = req.body.title;
    console.log(fileinfo)

})


module.exports = router