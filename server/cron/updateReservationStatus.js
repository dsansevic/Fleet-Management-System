const cron = require("node-cron");
const Reservation = require("../models/Reservation");

const updateReservationStatus = () => {
    cron.schedule("*/5 * * * *", async () => {
        const currentDate = new Date();

        try {
            await Reservation.updateMany(
                { status: "approved", startTime: { $lte: currentDate }, endTime: { $gt: currentDate } },
                { $set: { status: "live" } }
            );

            await Reservation.updateMany(
                { status: "pending", startTime: { $lt: currentDate } },
                { $set: { status: "expired" } }
            );

            await Reservation.updateMany(
                { status: "live", endTime: { $lt: currentDate } },
                { $set: { status: "completed" } }
            );

        } catch (error) {
            console.error("Error updating reservation statuses:", error);
        }
    });
};

module.exports = updateReservationStatus;
