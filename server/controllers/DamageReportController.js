const DamageReport = require("../models/DamageReport");
const Reservation = require("../models/Reservation");

const populateDamageReports = async (report, companyId, role) => {
    report = report.populate({
        path: "reservation",
        select: "startTime endTime vehicle purpose",
        match: { company: companyId },
        populate: {
            path: "vehicle",
            select: "brand model licensePlate",
            }
        })
    if (role === "admin")
            report = report.populate("reportedBy", "firstName lastName email");
    return report;
};

const validateReservation = async (reservationId, userId) => {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
        throw new Error("Reservation not found.");
    }
    if (reservation.user.toString() !== userId) {
        throw new Error("You do not have permission to report damage for this reservation.");
    }
    return reservation;
};

const filterReports = (reports) => {
    if (!reports) return [];
    if (Array.isArray(reports)) {
        return reports.filter((report) => report.reservation !== null);
    }
    return reports.reservation ? [reports] : [];
}

const addDamageReport = async (req, res) => {
    const { reservationId, description } = req.body;

    try {
        await validateReservation(reservationId, req.user.id);

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
        res.status(500).json({ message: error.message });
    }
};

const getDamageReports = async (req, res) => {
    try {
        const {companyId, role} = req.user;

        const reports = await populateDamageReports(DamageReport.find(), companyId, role);
        const filteredReports = filterReports(reports);

        if (filteredReports.length === 0)
            return res.status(404).json({message: "No damage reports found!"})   
        
        res.status(200).json(filteredReports);
    } catch (error) {
        console.error("Error fetching damage reports:", error);
        res.status(500).json({ message: "Failed to fetch damage reports.", error: error.message });
    }
};

const getDamageReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const {role} = req.user
        const companyId = req.user.companyId;

        const report = await populateDamageReports(DamageReport.findById(id), companyId, role);

        if (!report) {
            return res.status(404).json({ message: "No damage report found!" });
        }

        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching damage report details:", error);
        res.status(500).json({ message: "Failed to fetch damage report details.", error: error.message });
    }
};

const getUserReports = async (req, res) => {
    try {
        const {id, companyId, role} = req.user;

        const reports = await populateDamageReports(DamageReport.find({reportedBy: id}), companyId, role);
        
        const filteredReports = filterReports(reports);

        if (filteredReports.length === 0)
            return res.status(404).json({message: "No damage reports found!"})   
        
        res.status(200).json(filteredReports);
    } catch (error) {
        console.log("Error fetching user's reports. ", error);
        res.status(500).json({ message: "Failed to fetch user's damage reports."})
    }
}

const updateDamageReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminMessage } = req.body;

        const report = await DamageReport.findById(id);

        if (!report) {
            return res.status(404).json({ message: "Damage report not found." });
        }

        report.status = status || report.status;
        if (adminMessage) {
            report.adminMessage = adminMessage;
        }

        await report.save();

        res.status(200).json({ message: "Damage report status updated successfully.", report });
    } catch (error) {
        console.error("Error updating damage report status:", error);
        res.status(500).json({ message: "Failed to update damage report status.", error: error.message });
    }
};


module.exports = {
    addDamageReport,
    getDamageReports,
    getDamageReportById,
    getUserReports,
    updateDamageReportStatus
};