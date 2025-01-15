const express = require("express");
const router = express.Router();
const Controller = require("../../controller/file.controller");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

router.post("/file", upload.single("file"), Controller.uploadFile);
router.get("/file/:path", Controller.downFile);
router.delete("/file/:path", Controller.deleteFile);

module.exports = router;
