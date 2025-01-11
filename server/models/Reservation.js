const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,ref: 'Company',
      required: true
    },
    vehicle: {
      type: Schema.Types.ObjectId,ref: 'Vehicle',
      default: null,
    },
    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value > new Date(),
        message: "Start time must be in the future."
      },
    },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
            return value > this.startTime;
        },
        message: "End time must be after the start time."
    },
    },
    purpose: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending'
    },
    additionalDetails: {
      type: String,
      trim: true,
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);