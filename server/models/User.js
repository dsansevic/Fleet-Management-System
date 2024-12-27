const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,  
        trim: true, 
        lowercase: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8
    },
    oib: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{11}$/
    },
});

module.exports = mongoose.model("User", userSchema);