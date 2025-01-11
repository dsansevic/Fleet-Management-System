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

module.exports = { addReservation }