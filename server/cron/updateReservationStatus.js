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

            const pendingReapprovals = await Reservation.find({
                status: "pending-reapproval",
                newEndTime: { $ne: null },
            });

            for (const reservation of pendingReapprovals) {
                const oneHourBeforeStartTime = new Date(reservation.startTime.getTime() - 60 * 60 * 1000);
                if (currentDate >= oneHourBeforeStartTime) {
                    reservation.newEndTime = null; 
                    reservation.status = "approved"; 
                    await reservation.save();
                }
            }

        } catch (error) {
            console.error("Error updating reservation statuses:", error);
        }
    });
};

module.exports = updateReservationStatus;
