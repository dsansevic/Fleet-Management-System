const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["reservation", "status-update", "reminder", "technical", "damage-report"]
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    recipient: {
        type: Schema.Types.ObjectId, ref: "User", 
    },
    company: {
        type: Schema.Types.ObjectId, ref: "Company",
        required: true
    },
    reservation: {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Notification", notificationSchema);