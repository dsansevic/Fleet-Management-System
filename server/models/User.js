const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
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
        match: /^\S+@\S+\.\S+$/
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8
    },
    role: {
      type: String,
      enum: ['employee', 'admin'],
      default: 'employee',
      required: true,
    },
    company: { 
      type: Schema.Types.ObjectId, ref: 'Company', 
    }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) 
    return next();
  try {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.method('validatePassword', async function(password){
    return await bcrypt.compare(password, this.password)
})

module.exports = mongoose.model("User", userSchema)