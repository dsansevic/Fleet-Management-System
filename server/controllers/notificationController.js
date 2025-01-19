const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({company: req.user.companyId, type: "reservation"})
        .sort({ createdAt: -1 }); 

        if (notifications.length === 0) {
            return res.status(200).json({message: "No notifications found"});
        }
        res.status(200).json({
            data: notifications,
            message: "Notification fetched successful!"
        })
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
}

const getUsersNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({recipient: req.user.id})
        .sort({ createdAt: -1 });

        if (notifications.length === 0) {
            return res.status(200).json({ data: [], message: "No notifications found." });
        }
        res.status(200).json({
            data: notifications,
            message: "User notifications fetched successfully!"
        })

    } catch (error) {
        console.error("Error fetching user notifications:", error);
        return res.status(500).json({ message: "Error fetching user notifications", error: error.message });
    }
}

const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id);
        console.log(notification)
        if (!notification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        const isRecipient = notification.recipient?.toString() === req.user.id;
        const isAdmin = req.user.role === "admin" && notification.company.toString() === req.user.companyId;

        if (!isRecipient && !isAdmin) {
            return res.status(403).json({ message: "Unauthorized to modify this notification." });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read.", notification });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ message: "Failed to update notification.", error: error.message });
    }
};

const markAllCompanyNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ company: req.user.companyId, read: false, type: "reservation" }, { $set: { read: true } });

        res.status(200).json({ message: "All company notifications marked as read." });
    } catch (error) {
        console.error("Error updating notifications:", error);
        res.status(500).json({ message: "Failed to update notifications.", error: error.message });
    }
};

module.exports = { 
    getNotifications, 
    getUsersNotifications,
    markNotificationAsRead,
    markAllCompanyNotificationsAsRead
 };