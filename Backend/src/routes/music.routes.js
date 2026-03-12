const express = require('express');
const router = express.Router();
const musicController = require("../controllers/music.controller")
const multer = require ('multer')

const upload = multer({
    storage: multer.memoryStorage()
})


router.post("/upload", upload.single("music"), musicController.addMusic)



module.exports = router;