const express = require("express");

const {signUp, logIn, checkAvailability} = require("../controllers/userController");

const router = express.Router();

// signup route
router.post('/signup', signUp);

// login route
router.post('/login', logIn);

// check oib/email availability route
router.post('/check-availability', checkAvailability);

module.exports = router;