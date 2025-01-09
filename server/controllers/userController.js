const User = require("../models/User");
const Company = require("../models/Company");
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const generateToken = (user) =>
    jwt.sign({ 
      id: user._id, 
      role: user.role, 
      firstName: user.firstName, 
      companyId: user.company
    }, 
    process.env.JWT_SECRET, { expiresIn: '1h' });

const registerEmployee = async (req, res) => {
    const { firstName, lastName, email, password} = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const companyId = req.user.companyId; 

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required." });
        }

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'Invalid company ID!' });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found!' });
        }

        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          role: 'employee',
          company: companyId
        });
        await newUser.save();

        try {
          company.employees.push(newUser._id);
          await company.save();

          res.status(201).json({
              message: 'Employee registered successfully',
              user: { id: newUser._id, firstName: newUser.firstName, email: newUser.email, companyId: newUser.company },
          });
        } catch (companyError) {
            await newUser.remove();
            console.error('Error updating company:', companyError);
            return res.status(500).json({ message: 'Failed to update company. Canceled user creation.' });
        }
    }
    catch (error) {
      console.error('Error during employee registration:', error);
      return res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
}

const userCompanySignUp = async (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  let newUser = null;
  let newCompany = null;
  
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: 'admin'
    });
    await newUser.save();
    
    const newCompany = new Company({
      name: companyName,
      admin: newUser._id,
    });
    await newCompany.save();

    newUser.company = newCompany._id;
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
      user: { id: newUser._id, firstName: newUser.firstName, role: newUser.role, companyId: newUser.company },
  });

  } catch (error) {

    if (newUser?._id) {
      await User.findByIdAndDelete(newUser._id);
    }
    if (newCompany?._id) {
      await Company.findByIdAndDelete(newCompany._id);
    }
    res.status(500).json({
      message: 'Something went wrong. Please try again.',
      error: error.message,
    });
  }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email })
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
          user: { id: user._id, firstName: user.firstName, role: user.role, companyId: user.company }
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
}

const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
};

const verifySession = (req, res) => {
  try {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(401).json({ message: 'You are not logged in. Please log in to continue.' });      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      res.status(200).json({
        message: 'Authorised',
        user: { id: decodedToken.id, firstName: decodedToken.firstName, role: decodedToken.role, companyId: decodedToken.company }});

  } catch (error) {
    console.error('Session verification error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Your login has expired. Please log in again.' });
    } else {
      return res.status(401).json({ message: 'Your login is invalid. Please log in again.' });
    }
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

const getEmployees = async (req, res) => {
  try {
    let employees = await User.find({ role: "employee" });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No registered employees." });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching employees.", error: error.message });
  }
};

module.exports = {
  registerEmployee,
  userCompanySignUp, 
  logIn, 
  logout, 
  verifySession, 
  checkAvailability,
  getEmployees
}