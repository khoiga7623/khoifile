const express = require("express");
const router = express.Router();
const Controller = require("../../controller/user.controller");

// User CRUD
router.get("/user-info", Controller.getUserInfo);
router.get("/user", Controller.findAll);
router.get("/user/:id", Controller.findById);
router.post("/user", Controller.insert);
router.put("/user", Controller.update);
router.put("/user/change-password", Controller.updatePassword);
router.delete("/user/:id", Controller.delete);

// User audit
router.get("/audit", Controller.getListAudit);
router.post("/audit", Controller.createAudit);

module.exports = router;
