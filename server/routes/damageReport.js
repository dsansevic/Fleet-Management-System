const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { 
    addDamageReport, 
    getDamageReports, 
    getDamageReportById, 
    getUserReports,
    updateDamageReportStatus 
} = require("../controllers/DamageReportController");

const router = express.Router();

router.use(checkAuth);

router.post("/", checkRole("employee"), addDamageReport);

router.get("/", checkRole("admin"), getDamageReports);

router.get("/user", checkRole("employee"), getUserReports);

router.get("/:id", getDamageReportById);

router.patch("/:id/status", checkRole("admin"), updateDamageReportStatus);

module.exports = router;