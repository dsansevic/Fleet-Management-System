import { getDamageReport } from "@api/damageReports";
import { useState, useEffect } from "react";
import Table from "@components/ui/Table";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";
import { formatDate } from "@utils/formatDate";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";
import SelectField from "@components/form/SelectField";
import EmptyStateMessage from "@components/ui/EmptyStateMessage";

const DamageReports = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    const tableHeaders = [
        { name: "Vehicle", key: "vehicle", visibility: "" },
        { name: "Status", key: "status", visibility: "" },
        { name: "Reported By", key: "reportedBy", visibility: "" },
        { name: "Date Reported", key: "createdAt", visibility: "hidden lg:table-cell" },
        { name: "Description", key: "description", visibility: "hidden lg:table-cell" },
        { name: "Details", key: null, visibility: "" },
    ];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const getEmptyMessage = (status) => {
        switch (status) {
            case "pending":
                return "No pending reports found.";
            case "in-progress":
                return "No in-progress reports available.";
            case "resolved":
                return "No resolved reports found.";
            default:
                return "No reports have been submitted yet.";
        }
    };

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const data = await getDamageReport(currentPage, reportsPerPage, statusFilter);
                setReports(data.data);
                console.log(data.data)
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [currentPage, statusFilter]);


    const rows = (report) => {
        const status = GetReservationStatus(report.status);
        return (
            <tr key={report._id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {report.reservation?.vehicle?.brand} {report.reservation?.vehicle?.model}
                </td>
                <td className="px-6 py-4 text-sm font-medium capitalize flex items-center gap-1">
                    {status.icon}
                    <span>{status.label}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    {report.reportedBy?.firstName} {report.reportedBy?.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {formatDate(report.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {getPreviewText(report.description)}
                </td>
                <td className="px-6 py-4">
                    <Link to={report._id} className="text-brand-dark hover:text-brand-base text-sm font-medium">
                        View Details
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <div className="p-12 mx-auto overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Damage Reports</h2>
            <div className="mb-4 w-36">
            <label className="mr-2">Filter by status:</label>
                <SelectField
                    name="statusFilter"
                    value={statusFilter}
                    onChange={handleFilterChange}
                    options={[
                        { value: "", label: "All" },
                        { value: "pending", label: "Pending" },
                        { value: "in-progress", label: "In Progress" },
                        { value: "resolved", label: "Resolved" }
                    ]}
                    required = {false}
            />
            </div>
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : reports.length === 0 ? (
                <EmptyStateMessage
                    title="No damage reports found"
                    message="No one has submitted a damage report yet"
                />
            ) : (
                <>
                    
                    <Table headers={tableHeaders} data={reports} rows={rows} emptyMessage={getEmptyMessage(statusFilter)} />
                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                </>
            )}
        </div>
    );
};

export default DamageReports;