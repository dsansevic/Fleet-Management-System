const express = require("express");
// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
// const Company = require("../models/Company");

const router = express.Router();

const generateToken = (user) =>
    jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

router.post('/registration', async (req, res) => {
    const { firstName, lastName, email, oib, password } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Fill in all required fields.' });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const newUser = new User({ firstName, lastName, email, oib, password });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ message: 'Registration successful', token, user: { id: newUser._id, email: newUser.email } });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) 
        return res.status(404).send('User not found');
  
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) 
        return res.status(400).json({ message:'Invalid credentials'})
      
      const token = generateToken(user);
      res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } });

    } catch (error) {
      res.status(500).send(error.message);
    }
});

router.post('/check-availability', async (req, res) => {
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
});

module.exports = router;