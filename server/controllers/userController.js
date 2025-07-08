const User = require("../models/User");
const Company = require("../models/Company");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

const generateToken = (user, companyName) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      firstName: user.firstName,
      companyId: user.company,
      companyName: companyName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

const registerEmployee = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID!" });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found!" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: "employee",
      company: companyId,
    });
    await newUser.save();

    try {
      company.employees.push(newUser._id);
      await company.save();

      res.status(201).json({
        message: "Employee registered successfully",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          email: newUser.email,
          companyId: newUser.company,
        },
      });
    } catch (companyError) {
      await newUser.remove();
      console.error("Error updating company:", companyError);
      return res
        .status(500)
        .json({ message: "Failed to update company. Canceled user creation." });
    }
  } catch (error) {
    console.error("Error during employee registration:", error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

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
      role: "admin",
    });
    await newUser.save();

    const newCompany = new Company({
      name: companyName,
      admin: newUser._id,
    });
    await newCompany.save();

    newUser.company = newCompany._id;
    await newUser.save();

    const token = generateToken(newUser, companyName);
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: isProduction ? "None" : "Lax",
      secure: false,
    });

    res.status(201).json({
      message: "Sign up successful",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        role: newUser.role,
        companyId: newUser.company,
        companyName: companyName,
      },
    });
  } catch (error) {
    if (newUser?._id) {
      await User.findByIdAndDelete(newUser._id);
    }
    if (newCompany?._id) {
      await Company.findByIdAndDelete(newCompany._id);
    }
    res.status(500).json({
      message: "Something went wrong. Please try again.",
      error: error.message,
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const company = await Company.findById(user.company);
    const companyName = company ? company.name : "Unknown Company";

    const token = generateToken(user, companyName);

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 3600000, // 1h
      sameSite: isProduction ? "None" : "Lax",
      secure: true,
    });

    res.status(201).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        role: user.role,
        companyId: user.company,
        companyName: companyName,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).send(error.message);
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const verifySession = (req, res) => {
  try {
    const user = req.user;
    // double check
    if (!user) {
      return res.status(401).json({
        message: "You are not logged in. Please log in to continue.",
      });
    }
    res.status(200).json({
      message: "Authorised",
      user: {
        id: user.id,
        firstName: user.firstName,
        role: user.role,
        companyId: user.companyId,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.error("Session verification error:", error);

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// to check if the email is taken
const checkAvailability = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        message:
          "This email is already registered. If this is your email, you can log in or reset your password.",
      });
    }
  }
  res.status(200).json({ message: "Available" });
};

const getEmployees = async (req, res) => {
  try {
    const { companyId } = req.user;
    const { page = 1, limit = 6 } = req.query;

    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * limitNumber;
    const numberOfEmployees = await User.countDocuments({
      role: "employee",
      company: companyId,
    });
    if (numberOfEmployees === 0)
      return res.status(200).json({
        message: "No employees registered.",
        data: [],
        currentPage: pageNumber,
        totalPages: 1,
      });

    let employees = await User.find({ role: "employee", company: companyId })
      .sort({ lastName: 1 })
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      data: employees,
      currentPage: pageNumber,
      totalPages: Math.ceil(numberOfEmployees / limitNumber),
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching employees.",
      error: error.message,
    });
  }
};

module.exports = {
  registerEmployee,
  userCompanySignUp,
  logIn,
  logout,
  verifySession,
  checkAvailability,
  getEmployees,
};
