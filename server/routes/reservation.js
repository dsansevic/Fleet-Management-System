const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { addReservation } = require("../controllers/reservationController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("employee"), addReservation);

module.exports = router;