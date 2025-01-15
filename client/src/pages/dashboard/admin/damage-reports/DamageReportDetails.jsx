import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDamageReportById, updateDamageReportStatus } from "@api/damageReports";
import { updateVehicle } from "@api/vehicles"
import SelectField from "@components/form/SelectField";
import TextAreaField from "@components/form/TextAreaField";
import Button from "@components/ui/Button";
import SuccessMessage from "@components/ui/SuccessMessage"

const DamageReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [status, setStatus] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await fetchDamageReportById(id);
                setReport(data);
                setStatus(data.status);
            } catch (error) {
                setError("Failed to fetch damage report details.");
            }
        };

        fetchReport();
    }, [id]);

    const handleStatusChange = (e) => setStatus(e.target.value);

    const handleAdminMessageChange = (e) => setAdminMessage(e.target.value);

    const handleSubmit = async () => {
        try {
            setError("");
            setSuccess("");
            await updateDamageReportStatus(id, { status, adminMessage });
            setSuccess("Damage report status updated successfully.");
        } catch (error) {
            setError("Failed to update damage report status.");
        }
    };

    const handleMarkAsService = async () => {
        try {
            setError("");
            setSuccess("");
            const vehicleId = report.reservation.vehicle._id;

            await updateVehicle(vehicleId, {status: "service"});
            await updateDamageReportStatus(id, { status: "in-progress", adminMessage });
            setSuccess("Vehicle marked as 'service' successfully.");
        } catch (error) {
            setError("Failed to mark vehicle as 'service'.");
        }
    };

    if (!report) {
        return <p>Loading damage report details...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <div className="bg-white shadow-md border rounded-lg p-6 space-y-4 mt-4">
                <h3 className="text-2xl font-semibold">Damage Report Details</h3>
                <p><strong>Vehicle:</strong> {report.reservation.vehicle.brand} {report.reservation.vehicle.model}</p>
                <p><strong>Reported By:</strong> {report.reportedBy.firstName} {report.reportedBy.lastName}</p>
                <p><strong>Description:</strong> {report.description}</p>
                <p><strong>Status:</strong> {report.status}</p>
                {success && <SuccessMessage message={success}/>}
                {!success && (
                    <>
                        <SelectField
                            label="Update Status"
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                            options={[
                                { value: "pending", label: "Pending" },
                                { value: "in-progress", label: "In Progress" },
                                { value: "resolved", label: "Resolved" },
                            ]}
                            placeholder="Select status"
                        />

                        <TextAreaField
                            label="Admin Message"
                            name="adminMessage"
                            value={adminMessage}
                            onChange={handleAdminMessageChange}
                            placeholder="Add a message for the user..."
                            rows={4}
                        />

                        <div className="flex space-x-4">
                            <Button label="Update Status" onClick={handleSubmit} />
                            <Button label="Mark Vehicle as Service" onClick={handleMarkAsService} className="bg-red-500 text-white" />
                        </div>
                    </>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default DamageReportDetails;