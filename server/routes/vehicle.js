const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { addVehicle, getVehicle } = require("../controllers/vehicleController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("admin"), addVehicle);

router.get("/", getVehicle);

module.exports = router;