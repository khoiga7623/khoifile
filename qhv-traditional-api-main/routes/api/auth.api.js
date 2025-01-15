const express = require("express");
const router = express.Router();
const Controller = require("../../controller/auth.controller");

router.post("/login", Controller.login);

module.exports = router;
