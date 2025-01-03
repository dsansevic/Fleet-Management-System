const User = require("../models/User");
const jwt = require('jsonwebtoken');

const generateToken = (user) =>
    jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });


const signUp = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!.' });
        }

        const newUser = new User({ firstName, lastName, email, password, role });
        await newUser.save();

        const token = generateToken(newUser);
        res.cookie('accessToken', token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'strict',
          secure: false,
        });

        res.status(201).json({
            message: 'Sign up successful',
            user: { id: newUser._id, firstName: newUser.firstName, role: newUser.role },
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const logIn = async (req, res) => {
  console.log("U login header")
    const { email, password } = req.body;

    try {

      const user = await User.findOne({ email });
      if (!user) 
        return res.status(400).json({ message:'Invalid credentials'})
  
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) 
        return res.status(400).json({ message:'Invalid credentials'})
      
      const token = generateToken(user);

      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 3600000, // 1h
        sameSite: "strict",
        secure: false // true za HTTPS
      });

      res.status(201).json({
          message: 'Login successful',
          user: { id: user._id, firstName: user.firstName, role: user.role }
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
}

const logout = (req, res) => {
  console.log("Jel islo u logout provi")
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
};

const verifySession = (req, res) => {
  try {
      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ id: decodedToken.id, firstName: decodedToken.firstName, role: decodedToken.role });
  } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
  }
};

// to check if the email is taken
const checkAvailability = async (req, res) => {
    const { email } = req.body;

    if (email) {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'This email is already registered. If this is your email, you can log in or reset your password.' });
        }
    }
    res.status(200).json({ message: 'Available' });
}

module.exports = {signUp, logIn, logout, verifySession, checkAvailability}