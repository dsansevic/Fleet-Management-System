import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDamageReportById } from "@api/damageReports";
import LinkButton from "@components/ui/LinkButton";
import Title from "@components/ui/Title";
import {formatDate} from "@utils/formatDate"
import Loading from "@utils/Loading"

const DamageReportDetails = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
                console.log(data)
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

    if (loading || !report)
        return <Loading />

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
        <div className="p-6 lg:px-20 sm:w-screen max-w-4xl mx-auto ">
            <div className="bg-white shadow-md border rounded-2xl p-6 space-y-4 mt-4 relative">
                <button onClick={() => navigate("/dashboard-user/damage-report")} className="absolute z-50 top-0 right-0 text-xl">
                    ✖
                </button>

                <Title className="text-center">Report details</Title>

                <p className="text-gray-700 leading-relaxed">
                    You filed a damage report for the vehicle <strong>{report?.reservation?.vehicle?.brand} 
                    {report?.reservation?.vehicle?.model} </strong> with license plate <strong>{report?.reservation?.vehicle?.licensePlate} </strong>,
                    you used for the <strong> {report?.reservation?.purpose} </strong> 
                    from  <strong> {formatDate(report?.reservation?.startTime)}</strong>
                    to <strong>  {formatDate(report?.reservation?.endTime)}</strong >. 
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                        <strong>Issue Description:</strong> {report?.description || "No description provided."}
                    </p>
                </div>
                
                {status?.message && (
                    <p className="text-gray-700 italic">{status.message}</p>
                )}

                {report?.adminMessage && (
                    
                        <p className="text-gray-800">
                            <strong>Admin message:</strong> {report?.adminMessage}
                        </p>
                    
                )}
                    
            </div>
        </div>
    );
};

export default DamageReportDetails;