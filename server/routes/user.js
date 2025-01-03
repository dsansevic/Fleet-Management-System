const express = require("express");

const {signUp, logIn, logout, checkAvailability, verifySession} = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// signup route
router.post('/signup', signUp);

// login route
router.post('/login', logIn);

// logout route
router.post('/logout', logout) 

// check oib/email availability route
router.post('/check-availability', checkAvailability);

router.get('/verify-session', checkAuth, verifySession);

// testing
router.get('/dashboard', checkAuth, (req, res) => {
  res.json({ message: `Welcome ${req.user.id}!`, userRole: req.user.userRole });
});

router.get("/adminDashboard", checkAuth, checkRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted!" });
});

module.exports = router;