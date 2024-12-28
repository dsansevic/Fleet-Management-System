const express = require("express");
const cors = require("cors")
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('case sensitive routing', true);

require('dotenv').config();
mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;

db.on('error', (error) => {
 console.error('Connection error:', error);
});
db.once('open', function() {
 console.log('Connected to MongoDB');
});

app.use("/user", userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});  