const router = require("express").Router();

router.use("/api", require("./api/auth.api"));
router.use("/api", require("./api/user.api"));
router.use("/api", require("./api/file.api"));
router.use("/api", require("./api/news.api"));
router.use("/api", require("./api/clubs.api"));

module.exports = router;
