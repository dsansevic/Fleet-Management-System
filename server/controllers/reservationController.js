const Reservation = require("../models/Reservation");
const Notification = require("../models/Notification");

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
        const currentDate = new Date();
        const activeReservations = await Reservation.find({
            company: req.user.companyId,
            user: req.user.id,
            status: { $in: ["approved", "pending", "live"] },
            endTime: { $gte: currentDate },
        }).sort({ startTime: 1 });

        res.status(200).json(activeReservations);
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
    const { id } = req.params;
    const { startTime, endTime, additionalDetails, purpose, status } = req.body;

    try {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        const now = new Date();
        if (new Date(reservation.startTime) <= new Date(now.getTime() + 60 * 60 * 1000)) {
            return res
                .status(400)
                .json({ message: "Cannot edit a reservation less than 1 hour before it starts." });
        }

        if (startTime) reservation.startTime = new Date(startTime);
        if (endTime) reservation.endTime = new Date(endTime);
        if (additionalDetails) reservation.additionalDetails = additionalDetails;
        if (purpose) reservation.purpose = purpose;
        if (status) reservation.status = status;

        await reservation.save();

        res.status(200).json({
            message: "Reservation updated successfully.",
            reservation,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports 
    = { addReservation, 
        getActiveReservations, 
        getInactiveReservations, 
        getReservationById,
        updateReservation    
    }