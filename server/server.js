const express = require("express");
const cors = require("cors")
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler")
const updateReservationStatus = require("./cron/updateReservationStatus");
require('dotenv').config();

const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");
const reservationRoutes = require("./routes/reservation");
const damageReportRoutes = require("./routes/damageReport");
const notificationRoutes = require("./routes/notification");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.set('case sensitive routing', true);

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store"); 
    next();
});

mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;

db.on('error', (error) => {
 console.error('Connection error:', error);
});
db.once('open', function() {
 console.log('Connected to MongoDB');
});

updateReservationStatus();

app.use("/user", userRoutes);

app.use("/vehicle", vehicleRoutes);

app.use("/reservation", reservationRoutes);

app.use("/damage-report", damageReportRoutes);

app.use("/notification", notificationRoutes);

app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});  