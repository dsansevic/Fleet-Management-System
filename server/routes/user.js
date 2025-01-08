const express = require("express");

const {
    registerEmployee, 
    userCompanySignUp,
    logIn, 
    logout,
    checkAvailability, 
    verifySession,
    getEmployees
} = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

// admin signup route
router.post('/admin-company-signup', userCompanySignUp);

// login route
router.post('/login', logIn);

// logout route
router.post('/logout', logout) 

// check oib/email availability route
router.post('/check-availability', checkAvailability);

router.get('/verify-session', checkAuth, verifySession);

router.get('/employees', checkAuth, checkRole("admin"), getEmployees);
router.post('/employees', checkAuth, checkRole("admin"), registerEmployee);

module.exports = router;