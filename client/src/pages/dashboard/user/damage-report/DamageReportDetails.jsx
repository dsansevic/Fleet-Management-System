import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDamageReportById } from "@api/damageReports";
import LinkButton from "@components/ui/LinkButton";
import Title from "@components/ui/Title";
import {formatDate} from "@utils/formatDate"

const DamageReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const getCurrentStatus = (status) => {
        switch(status) {
            case "in-progress":
                return {
                    label: "In progress",
                    message: "The admin has review your report and has taken actions. 🛠️"
            }
            case "pending":
                return {
                    label: "Pending",
                    message: "Your report is awaiting admin review.⏳"
            }
            case "resolved":
                return {
                    label: "Resolved",
                    message: "The issue has been resolved. Thank you for reporting it.😊"
            }
            default:
                return {
                    label: "Unknown",
                    }
          }

    }

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true)
                const data = await getDamageReportById(id);
                setReport(data);
            } catch (error) {
                setError("Failed to fetch damage report details.");
            }
            finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading || !report) {
        return (
            <div className="p-6 max-w-6xl mx-auto text-center">
                <p className="text-gray-600">Loading your damage report history...</p>
                <div className="loader animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12 mx-auto mt-4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-6xl mx-auto text-center">
                <p className="text-red-600">Failed to fetch damage reports: {error}</p>
                <LinkButton to="/dashboard" label="Go Back to Dashboard" />
            </div>
        );
    }

    const status = getCurrentStatus(report.status)
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <LinkButton
                to= {(-1)}
                label="Go back">
            </LinkButton>
            <div className="bg-white shadow-md border rounded-lg p-6 space-y-4 mt-4">
            <Title>Report details</Title>
            <p>
            You filed a damage report for the vehicle <strong>{report?.reservation?.vehicle?.brand} 
            {report?.reservation?.vehicle?.model} </strong> with license plate <strong>{report?.reservation?.vehicle?.licensePlate} </strong>,
            you used for the <strong> {report?.reservation?.purpose} </strong> 
            from  <strong> {formatDate(report?.reservation?.startTime)}</strong>
            to <strong>  {formatDate(report?.reservation?.endTime)}</strong>. 
            </p>
            <p className="break-words hyphens-auto">
                Issue description: <strong>{report?.description || "No description provided."}</strong>
            </p>
            <p>
                Current status: <strong>{status.label}</strong>
            </p>
            {status?.message && 
                <p>{status.message}</p>}

            {report?.adminMessage && 
                <p className="break-words hyphens-auto">
                    Admin left a message for you: {report?.adminMessage}
                </p>
            }
                
            </div>
        </div>
    );
};

export default DamageReportDetails;