const mongoose = require("mongoose");

const damageReportSchema = new mongoose.Schema(
    {
        reservation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "resolved"],
            default: "pending",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("DamageReport", damageReportSchema);