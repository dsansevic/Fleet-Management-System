const Reservation = require("../models/Reservation");
const Notification = require("../models/Notification");
const Vehicle = require("../models/Vehicle");

const addReservation = async (req, res) => {
    const { startTime, endTime, purpose, additionalDetails } = req.body;

    try {
        const newReservation = new Reservation({
            user: req.user.id,
            company: req.user.companyId,
            startTime,
            endTime,
            purpose,
            ...(additionalDetails?.trim() && { additionalDetails }),
        });

        await newReservation.save();

        const notificationMessage = `New reservation created by ${req.user.firstName}: ${purpose}.`;
        const notification = new Notification({
            type: "reservation",
            message: notificationMessage,
            sender: req.user.id,
            company: req.user.companyId,
            reservation: newReservation._id,
        });

        await notification.save();

        res.status(201).json({ 
            message: "Reservation created successfully", 
            reservation: newReservation 
        });
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ 
            message: "Failed to create reservation", 
            error: error.message 
        });
    }
};

const getActiveReservations = async (req, res) => {
    try {
        const { page = 1, limit = 6 } = req.query;
        const currentDate = new Date();

        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));
        const skip = (pageNumber - 1) * limitNumber;

        const totalReservations = await Reservation.countDocuments({
            company: req.user.companyId,
            user: req.user.id,
            status: { $in: ["approved", "pending", "live", "pending-reapproval"] },
            endTime: { $gte: currentDate },
        });

        if (totalReservations === 0) {
            return res.status(200).json({ data: [], currentPage: pageNumber, totalPages: 0 });
        }

        const activeReservations = await Reservation.find({
            company: req.user.companyId,
            user: req.user.id,
            status: { $in: ["approved", "pending", "live", "pending-reapproval"] },
            endTime: { $gte: currentDate },
        })
        .sort({ startTime: 1 })
        .skip(skip) 
        .limit(limitNumber);

        res.status(200).json({
            data: activeReservations,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalReservations / limitNumber),
        });
    } catch (error) {
        console.error("Error fetching active reservations:", error);
        res.status(500).json({ message: "Failed to fetch active reservations", error: error.message });
    }
};

const getInactiveReservations = async (req, res) => {
    try {
        const currentDate = new Date();
        const pastReservations = await Reservation.find({
            company: req.user.companyId,
            user: req.user.id,
            $or: [
                { endTime: { $lt: currentDate } },
                { status: "canceled" }, 
                { status: "declined" }, 
            ],
        }).sort({ endTime: -1 });
        res.status(200).json(pastReservations);
    } catch (error) {
        console.error("Error fetching past reservations:", error);
        res.status(500).json({ message: "Failed to fetch past reservations", error: error.message });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate("user", "firstName lastName");
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        console.error("Error fetching reservation:", error);
        res.status(500).json({ message: "Failed to fetch reservation", error: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }
        console.log(req.body)
        const { NewEndTime } = req.body;

        if (!NewEndTime) {
            return res.status(400).json({ message: "New end time is required." });
        }

        const now = new Date();
        const newEndTime = new Date(NewEndTime);
        const startTime = new Date(reservation.startTime);
       
        if (startTime - now < 90 * 60 * 1000) {
            return res.status(403).json({
                message: "Cannot change reservation less than 90 minutes before it starts.",
            });
        }

        if (newEndTime <= startTime) {
            return res.status(400).json({
                message: "New end time must be after the current start time.",
            });
        }

        reservation.newEndTime = newEndTime;
        reservation.status = "pending-reapproval";

        await reservation.save();

        res.status(200).json({
            message: "Change request submitted successfully.",
            reservation,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateReservationStatus = async (req, res) => {
    try {
        const { status, vehicle, rejectReason } = req.body;
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        const now = new Date();
        const startTime = new Date(reservation.startTime);

        if (startTime - now < 60 * 60 * 1000) {
            return res.status(400).json({ message: "Cannot update reservation status less than 1 hour before start time." });
        }

        if (!["approved", "declined"].includes(status)) {
            return res.status(400).json({ message: "Allowed status values are 'approved' or 'declined'." });
        }

        if (status === "declined" && rejectReason) {
            reservation.rejectReason = rejectReason;
        }
        if (status === "approved") {
            if (!vehicle) {
                return res.status(400).json({ message: "A vehicle must be assigned when approving a reservation." });
            }
            const assignedVehicle = await Vehicle.findById(vehicle);
            if (!assignedVehicle) {
                return res.status(404).json({ message: "Assigned vehicle not found." });
            }
            if (assignedVehicle.company.toString() !== reservation.company.toString()) {
                return res.status(403).json({ message: "Vehicle does not belong to the company." });
            }
            reservation.vehicle = vehicle;
        }

        reservation.status = status;

        await reservation.save();

        res.status(200).json({
            message: `Reservation status updated to ${status}.`,
            reservation,
        });
    } catch (error) {
        console.error(`Error updating reservation status for ID: ${req.params.id}`, error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const handleReapproval = async (req, res) => {
    try {
        console.log("noslo je")
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation || reservation.status !== "pending-reapproval") {
            return res.status(404).json({ message: "Reservation not found or not awaiting reapproval." });
        }

        const { action } = req.body;

        const allowedActions = ["approve", "reject"];
        if (!allowedActions.includes(action)) {
            return res.status(400).json({ message: "Invalid action. Allowed actions are 'approve' or 'reject'." });
        }

        if (action === "approve") {
            reservation.endTime = reservation.newEndTime; 
            reservation.newEndTime = null; 
        } else if (action === "reject") {
            reservation.newEndTime = null; 
        }
        reservation.status = "approved";

        await reservation.save();

        res.status(200).json({ message: `Reservation ${action}d successfully.`, reservation });
    } catch (error) {
        console.error("Error handling reapproval:", error);
        res.status(500).json({ message: "Failed to handle reapproval.", error: error.message });
    }
};

const getPendingReservations = async (req, res) => {
    try {
        const now = new Date();
        const reviewDeadline = new Date(now.getTime() + 60 * 60 * 1000);

        const pendingReservations = await Reservation.find({
            status: "pending",
            startTime: { $gte: reviewDeadline },
        })
            .populate("user", "firstName email")
            .populate("vehicle", "brand model");

        const reapprovalReservations = await Reservation.find({
            status: "pending-reapproval",
        })
            .populate("user", "firstName email")
            .populate("vehicle", "brand model");

        res.status(200).json({
            pending: pendingReservations,
            pendingReapproval: reapprovalReservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: "Failed to fetch reservations" });
    }
};

const getLiveOrCompletedReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({
            company: req.user.companyId,
            status: { $in: ["live", "completed"] },
        })
            .populate("vehicle", "brand model")
            .sort({ startTime: 1 });

        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching live or completed reservations:", error);
        res.status(500).json({
            message: "Failed to fetch live or completed reservations",
            error: error.message,
        });
    }
};

module.exports 
    = { addReservation, 
        getActiveReservations, 
        getInactiveReservations, 
        getReservationById,
        updateReservation,
        getPendingReservations, 
        updateReservationStatus,
        handleReapproval,
        getLiveOrCompletedReservations   
    }