import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDamageReportById, updateDamageReportStatus } from "@api/damageReports";
import { updateVehicle } from "@api/vehicles"
import SelectField from "@components/form/SelectField";
import TextAreaField from "@components/form/TextAreaField";
import Button from "@components/ui/Button";
import SubmitButton from "@components/ui/SubmitButton"
import SuccessMessage from "@components/ui/SuccessMessage"
import {formatDate} from "@utils/formatDate"

const DamageReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [status, setStatus] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [error, setError] = useState("");
    const [fetchingError, setFetchingError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getDamageReportById(id);
                setReport(data);
                setStatus(data.status);
            } catch (error) {
                setFetchingError(error.message);
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
            setError(error.message);
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

    if (fetchingError){
        return (
            <div className="flex items-center space-x-2 text-error bg-red-100 p-4 rounded-md">
                <span>{fetchingError}</span>
            </div>
        )
    }

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
            <h3 className="text-2xl font-semibold">Damage Report</h3>
            <p>
            A damage report has been submitted for the vehicle <strong>{report?.reservation?.vehicle?.brand} 
            {report?.reservation?.vehicle?.model} </strong> with license plate <strong>{report?.reservation?.vehicle?.licensePlate} </strong>. 
            The issue is related to the reservation for <strong> {report?.reservation?.purpose} </strong> 
            from  <strong> {formatDate(report?.reservation?.startTime)} </strong>
            to <strong>  {formatDate(report?.reservation?.endTime)}</strong>. 
            Reported by <strong>{report?.reportedBy?.firstName} {report?.reportedBy?.lastName} </strong>
            on <strong>{formatDate(report?.createdAt)} </strong>. 
            </p>
            <p className="break-words hyphens-auto">
                Issue description: <strong>{report?.description || "No description provided."}</strong>
            </p>
            <p>
                Current status: <strong>{report?.status || "Unknown"}</strong>.
            </p>
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
                        <p> If you think that the vehicle requires a technical inspection or repair, please mark it as 'Service'.</p>
                        <div className="flex justify-between">
                            <SubmitButton readyToSend={!adminMessage} onClick={handleSubmit} >Update Status</SubmitButton>
                            <Button label="Mark Vehicle as Service" onClick={handleMarkAsService} className="bg-gray-400 text-white hover:bg-gray-300 mt-3"/>
                        </div>
                    </>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default DamageReportDetails;