const express = require("express");

const {
    signUp, 
    userCompanySignUp,
    logIn, 
    logout,
    checkAvailability, 
    verifySession
} = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// user signup route
router.post('/signup', signUp);

// admin signup route
router.post('/admin-company-signup', userCompanySignUp);

// login route
router.post('/login', logIn);

// logout route
router.post('/logout', logout) 

// check oib/email availability route
router.post('/check-availability', checkAvailability);

router.get('/verify-session', checkAuth, verifySession);

module.exports = router;