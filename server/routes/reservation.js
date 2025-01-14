const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { 
    addReservation,
    getActiveReservations, 
    getInactiveReservations, 
    getReservationById,
    updateReservation,
    getPendingReservations
} = require("../controllers/reservationController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("employee"), addReservation);

router.get("/", checkRole("admin"), getPendingReservations);

router.get("/active", checkRole("employee"), getActiveReservations);

router.get("/inactive", checkRole("employee"), getInactiveReservations);

router.get("/:id", getReservationById);

router.patch("/:id", updateReservation);

module.exports = router;