const DamageReport = require("../models/DamageReport");
const Reservation = require("../models/Reservation");

const populateDamageReports = async (reports, companyId, role) => {
    const populateOptions = [
        {
            path: "reservation",
            select: "startTime endTime vehicle purpose",
            match: { company: companyId },
            populate: {
                path: "vehicle",
                select: "brand model licensePlate",
            },
        }
    ];

    if (role === "admin") {
        populateOptions.push({
            path: "reportedBy",
            select: "firstName lastName email",
        });
    }

    return await DamageReport.populate(reports, populateOptions);
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
        const { page = 1, limit = 5, status } = req.query;

        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));
        const skip = (pageNumber - 1) * limitNumber;

        const reservations = await Reservation.find({ company: companyId }).select('_id');

        if (reservations.length === 0) {
            return res.status(200).json({ data: [], currentPage: pageNumber, totalPages: 0 });
        }
        const reservationIds = reservations.map(res => res._id);

        const filter = { reservation: { $in: reservationIds } };

        if (status) {
            const validStatuses = ["pending", "in-progress", "resolved"];
            if (validStatuses.includes(status)) {
                filter.status = status;
            }
        }
        const numberOfReports = await DamageReport.countDocuments(filter);
        if (numberOfReports === 0) {
            return res.status(200).json({ data: [], currentPage: pageNumber, totalPages: 0 });
        }

        let reports = await DamageReport.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

        reports = await populateDamageReports(reports, companyId, role);
        res.status(200).json({
            data: reports,
            currentPage: pageNumber,
            totalPages: Math.ceil(numberOfReports / limitNumber),
        });
    } catch (error) {
        console.error("Error fetching damage reports:", error);
        res.status(500).json({ message: "Failed to fetch damage reports.", error: error.message });
    }
};

const getDamageReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId, role, companyId } = req.user;

        const report = await DamageReport.findById(id).populate('reservation');
        if (!report) {
            return res.status(404).json({ message: "No damage report found!" });
        }

        if (role === "employee" && report.reportedBy.toString() !== userId) {
            return res.status(403).json({ message: "Access denied: You cannot view this damage report." });
        }

        if (role === "admin" && report.reservation.company.toString() !== companyId) {
            return res.status(403).json({ message: "Access denied: You cannot view this damage report." });
        }

        const populatedReport = await populateDamageReports(report, companyId, role);

        res.status(200).json(populatedReport);
    } catch (error) {
        console.error("Error fetching damage report details:", error);
        res.status(500).json({ message: "Failed to fetch damage report details.", error: error.message });
    }
};

const getUserReports = async (req, res) => {
    try {
        const {id, companyId, role} = req.user;
        const { page = 1, limit = 5 } = req.query;

        const pageNumber = Math.max(1, parseInt(page, 10));
        const limitNumber = Math.max(1, parseInt(limit, 10));
        const skip = (pageNumber - 1) * limitNumber;

        const numberOfReports = await DamageReport.countDocuments({ reportedBy: id });
        
        if (numberOfReports === 0)
            return res.status(200).json({ data: [], currentPage: pageNumber, totalPages: 0 });

        let reports = await DamageReport.find({ reportedBy: id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        reports = await populateDamageReports(reports, companyId, role);
  
        res.status(200).json({
            data: reports,
            currentPage: pageNumber,
            totalPages: Math.ceil(numberOfReports / limitNumber),
        });
    
    } catch (error) {
        console.log("Error fetching user's reports. ", error);
        res.status(500).json({ message: "Failed to fetch user's damage reports."})
    }
}

const updateDamageReportStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminMessage } = req.body;
        const { companyId } = req.user;

        const report = await DamageReport.findById(id).populate('reservation');

        if (!report) {
            return res.status(404).json({ message: "Damage report not found." });
        }

        if (report.reservation.company.toString() !== companyId) {
            return res.status(403).json({ message: "Access denied: You cannot update this damage report." });
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