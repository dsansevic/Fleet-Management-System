const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const { 
    addReservation,
    getAllReservations,
    getActiveReservations, 
    getInactiveReservations, 
    getReservationById,
    updateReservation,
    getPendingReservations,
    updateReservationStatus,
    handleReapproval,
    getLiveOrCompletedReservations
} = require("../controllers/reservationController");

const router = express.Router();
router.use(checkAuth);

router.post("/", checkRole("employee"), addReservation);


router.get("/pending", checkRole("admin"), getPendingReservations);

router.get("/active", checkRole("employee"), getActiveReservations);

router.get("/inactive", checkRole("employee"), getInactiveReservations);

router.get("/live-or-completed", checkRole("employee"), getLiveOrCompletedReservations);

router.get("/:id", getReservationById);

router.get("/", checkRole("admin"), getAllReservations);


router.patch("/:id/status", checkRole("admin"), updateReservationStatus);

router.patch("/:id/reapproval", checkRole("admin"), handleReapproval);

router.patch("/:id", checkRole("employee"), updateReservation);

module.exports = router;