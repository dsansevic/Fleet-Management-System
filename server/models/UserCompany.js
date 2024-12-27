// Added to avoids data duplication and ensure scalability 
// as the number of users and companies grows.
// A user can belong to multiple companies, and their role can vary for each company. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCompanySchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User',
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId, ref: 'Company',
      required: true,
    },
    role: {
      type: String,
      enum: ['employee', 'admin'],
      required: true,
    },
});

module.exports = mongoose.model('UserCompany', userCompanySchema);