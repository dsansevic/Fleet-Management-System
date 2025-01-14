const DamageReport = require("../models/DamageReport");
const Reservation = require("../models/Reservation");

const addDamageReport = async (req, res) => {
    const { reservationId, description } = req.body;
    try {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found." });
        }

        if (reservation.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You do not have permission to report damage for this reservation." });
        }

        const damageReport = new DamageReport({
            reservation: reservationId,
            description,
            reportedBy: req.user.id,
        });

        await damageReport.save();

        res.status(201).json({
            message: "Damage report created successfully.",
            damageReport,
        });
    } catch (error) {
        console.error("Error creating damage report:", error);
        res.status(500).json({ message: "Failed to create damage report.", error: error.message });
    }
}

const getDamageReports = async (req, res) => {
    try {
        const companyId = req.user.companyId;

        const reports = await DamageReport.find()
            .populate({
                path: "reservation",
                select: "startTime endTime vehicle company",
                match: { company: companyId }, 
                populate: {
                    path: "vehicle",
                    select: "brand model licensePlate", 
                },
            })
            .populate("reportedBy", "firstName lastName email");

        const filteredReports = reports.filter(report => report.reservation !== null);

        res.status(200).json(filteredReports);
    } catch (error) {
        console.error("Error fetching damage reports:", error);
        res.status(500).json({ message: "Failed to fetch damage reports.", error: error.message });
    }
};

module.exports 
    = { 
        addDamageReport,
        getDamageReports
    }