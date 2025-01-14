const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { addDamageReport, getDamageReports } = require("../controllers/DamageReportController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("employee"), addDamageReport);

router.get("/", checkRole("admin"), getDamageReports);

module.exports = router;