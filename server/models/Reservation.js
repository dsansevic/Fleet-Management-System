const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User',
      required: true, 
    },
    company: {
      type: Schema.Types.ObjectId,ref: 'Company',
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,ref: 'Vehicle',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
    },
});

module.exports = mongoose.model('Reservation', reservationSchema);
