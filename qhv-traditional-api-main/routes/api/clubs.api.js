const express = require("express");
const router = express.Router();
const Controller = require("../../controller/clubs.controller");

router.get("/clubs", Controller.findAll);
router.get("/clubs/:id", Controller.findById);
router.post("/clubs", Controller.insert);
router.put("/clubs", Controller.update);
router.delete("/clubs/:id", Controller.delete);

module.exports = router;
