const express = require("express");
const router = express.Router();
const Controller = require("../../controller/news.controller");

router.get("/news", Controller.findAll);
router.get("/news-by-user", Controller.findByUserId);
router.get("/news/:id", Controller.findById);
router.post("/news", Controller.insert);
router.put("/news", Controller.update);
router.put("/news-status", Controller.updateStatus);
router.delete("/news/:id", Controller.delete);

module.exports = router;
