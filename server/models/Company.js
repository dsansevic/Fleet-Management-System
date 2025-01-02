const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: { 
        type: String, 
        trim: true, 
        required: true 
    },
    oib: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{11}$/
    },
    employees: [
        { type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

module.exports = mongoose.model('Company', companySchema);