const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");
const {
    getNotifications, 
    getUsersNotifications,
    markNotificationAsRead,
    markAllCompanyNotificationsAsRead
} = require("../controllers/notificationController");

const router = express.Router();

router.use(checkAuth);

router.get("/", checkRole("admin"), getNotifications);

router.get("/user", checkRole("employee"), getUsersNotifications);

router.patch("/:id/read", markNotificationAsRead);

router.patch("/read-all", checkRole("admin"), markAllCompanyNotificationsAsRead);

module.exports = router;