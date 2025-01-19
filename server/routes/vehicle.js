const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { addVehicle, getVehicle, getVehicleById, updateVehicle } = require("../controllers/vehicleController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("admin"), addVehicle);

router.get("/", getVehicle);

router.get("/:id", getVehicleById, checkRole("admin"));

router.patch("/:id", checkRole("admin"), updateVehicle);

module.exports = router;