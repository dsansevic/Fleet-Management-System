const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId, ref: 'Company',
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'service'],
      default: 'available',
    },
    capacity: {
        type: Number,
        default: 4,
        required: true,
    },
    type: {
        type: String,
        enum: ['car', 'truck', 'van', 'motorcycle', 'bus'],
        default: 'car',
        required: true,
    },
    vehicleInspection: {
        type: Date,
        required: true,
        validate: function (value) {
            if (!this.isNew) return true;
            return value > new Date() && value <= new Date(new Date().setFullYear(new Date().getFullYear() + 1));
          },
    }
  },
);

module.exports = mongoose.model('Vehicle', vehicleSchema);