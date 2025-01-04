const Company = require("../models/Company");

const addCompany = async (req, res) => {
    const {name, oib} = req.body
    try {
        const newCompany = new Company({
            name,
            oib,
            admin: req.user.id
        });
        await newCompany.save();
    
        res.status(201).json({ message: 'Company added successfully',});

    } catch (error) {
        res.status(500).json({ message: 'Error creating company', error: error.message });
    }
}

const checkAvailability = async (req, res) => {
    const { oib } = req.body;

    if (oib) {
        const existingCompany = await Company.findOne({ oib });
        if (existingCompany) {
            return res.status(400).json({ message: 'This company is already registered.' });
        }
    }
    res.status(200).json({ message: 'Available' });
}

module.exports = {addCompany, checkAvailability}