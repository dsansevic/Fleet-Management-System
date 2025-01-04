const express = require("express");

const {addCompany, checkAvailability} = require("../controllers/companyControllers");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const router = express.Router();

router.post('/add-company', checkAuth, checkRole("admin"), addCompany);

router.post('/check-availability', checkAuth, checkRole("admin"), checkAvailability);

module.exports = router;