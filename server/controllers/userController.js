const User = require("../models/User");
const jwt = require('jsonwebtoken');

const generateToken = (user) =>
    jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });


const signUp = async (req, res) => {
    const { firstName, lastName, email, oib, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Fill in all required fields.' });
        }

        const newUser = new User({ firstName, lastName, email, oib, password });
        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({ message: 'Sign up successful', token, user: { id: newUser._id, firstName: newUser.firstName} });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) 
        return res.status(400).json({ message:'Invalid credentials'})
  
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) 
        return res.status(400).json({ message:'Invalid credentials'})
      
      const token = generateToken(user);

      res.status(200).json({ message: 'Login successful', token, user: { id: user._id, firstName: user.firstName }, role: user.role });

    } catch (error) {
      res.status(500).send(error.message);
    }
}

// to check if the oib/email is taken
const checkAvailability = async (req, res) => {
    const { email, oib } = req.body;

    if (email) {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'This email is already registered. If this is your email, you can log in or reset your password.' });
        }
    }

    if (oib) {
        const existingUserByOIB = await User.findOne({ oib });
        if (existingUserByOIB) {
            return res.status(400).json({ message: 'It seems like this OIB is already in use. If this doesn’t seem right, please contact our support team!' });
        }
    }

    res.status(200).json({ message: 'Available' });
}

module.exports = {signUp, logIn, checkAvailability}