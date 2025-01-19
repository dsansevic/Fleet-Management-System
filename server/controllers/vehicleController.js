const Vehicle = require("../models/Vehicle");

const addVehicle = async (req, res) => {
    try {
        const { brand, model, licensePlate, status, capacity, type, vehicleInspection } = req.body;
        const companyId = req.user.companyId; 

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required." });
        }

        const existingVehicle = await Vehicle.findOne({ licensePlate });
        if (existingVehicle) {
            return res.status(400).json({ message: "Vehicle with this license plate already exists." });
        }

        const newVehicle = new Vehicle({
            company: companyId,
            brand,
            model,
            licensePlate,
            status,
            capacity,
            type,
            vehicleInspection,
        });

        await newVehicle.save();
        res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
    } catch (error) {
        console.error("Error adding vehicle:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};

const getVehicle = async (req, res) => {
    try {
        const companyId = req.user.companyId; 
        const { page, limit } = req.query;

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required." });
        }

        let vehicles;

        if (page && limit) {
            const pageNumber = Math.max(1, parseInt(page, 10));
            const limitNumber = Math.max(1, parseInt(limit, 10));
            const skip = (pageNumber - 1) * limitNumber;

            const totalVehicles = await Vehicle.countDocuments({ company: companyId });

            if (totalVehicles === 0) {
                return res.status(200).json({ data: [], currentPage: pageNumber, totalPages: 0 });
            }

            vehicles = await Vehicle.find({ company: companyId })
                .sort({ brand: 1 })
                .skip(skip)
                .limit(limitNumber);

            return res.status(200).json({
                data: vehicles,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalVehicles / limitNumber),
            });
        } else {
            vehicles = await Vehicle.find({ company: companyId }).sort({ brand: 1 });

            return res.status(200).json({ data: vehicles });
        }
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        res.status(500).json({ message: "An unexpected error occurred while fetching vehicles." });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const {id} = req.params;
        
        const vehicle = await Vehicle.findById(id);
        if (!vehicle)
            return res.status(400).json({message: "That vehicles doesnt exist in the database!"})

        if (vehicle.company.toString() !== req.user.companyId)
            return res.status(403).json({ message: "Access denied!" });

        res.status(200).json(vehicle)
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        res.status(500).json({ message: "An unexpected error occurred while fetching vehicle." });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const allowedFields = ["brand", "model", "licensePlate", "status", "capacity", "type", "vehicleInspection"];
        const updateKeys = Object.keys(updates);

        const isValidUpdate = updateKeys.every((key) => allowedFields.includes(key));

        if (!isValidUpdate) {
            return res.status(400).json({ message: "Invalid update fields." });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found." });
        }

        if (vehicle.company.toString() !== req.user.companyId)  
            return res.status(403).json({ message: "Access denied: You cannot update this vehicle." });

        updateKeys.forEach((key) => {
            vehicle[key] = updates[key];
        });

        await vehicle.save();

        res.status(200).json({
            message: "Vehicle updated successfully.",
            vehicle,
        });
    } catch (error) {
        console.error("Error updating vehicle:", error);
        res.status(500).json({ message: "Failed to update vehicle.", error: error.message });
    }
};

module.exports = { addVehicle, getVehicle, getVehicleById, updateVehicle };