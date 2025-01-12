const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { 
    addReservation,
    getActiveReservations, 
    getInactiveReservations, 
    getReservationById,
    updateReservation
} = require("../controllers/reservationController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("employee"), addReservation);

router.get("/active", checkRole("employee"), getActiveReservations);

router.get("/inactive", checkRole("employee"), getInactiveReservations);

router.get("/:id", checkRole("employee"), getReservationById);

router.patch("/:id", updateReservation);

module.exports = router;