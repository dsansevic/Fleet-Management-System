const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: { 
        type: String, 
        trim: true, 
        required: true 
    },
    admin: { 
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    employees: [
        { type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

module.exports = mongoose.model('Company', companySchema);