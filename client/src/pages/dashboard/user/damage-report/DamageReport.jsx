import { useState, useEffect } from "react";
import { getUserDamageReport } from "@api/damageReports"
import Table from "@components/ui/Table"
import { Link } from "react-router-dom";
import { sortData } from "@utils/sortData"
import LinkButton from "@components/ui/LinkButton"
import Title from "@components/ui/Title";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";

const DamageReport = () => {
    const [reports, setReports] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(
        parseInt(sessionStorage.getItem("damageReportPage")) || 1
    );
    const reportsPerPage = 5;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const tableHeaders = [
        { name: "Vehicle", key: "vehicle", visibility: ""},
        { name: "Status", key: "status", visibility: ""},
        { name: "Date", key: "date", visibility: "hidden lg:table-cell"},
        { name: "Description", key: "description", visibility: "hidden lg:table-cell"},
        { name: "Details", key: "details", visibility: ""},
    ]

    const rows = (report) => 
        { const status = GetReservationStatus(report.status);
        return (
            <tr
                key={report._id}
                className="border-b border-indigo-50 hover:bg-gray-50"
            >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    <strong>{report.reservation?.vehicle?.brand}</strong><br/>
                    {report.reservation?.vehicle?.model}
                </td>
                <td className="px-6 py-4 text-sm font-medium capitalize flex items-center gap-1">
                    {status.icon}
                    <span>{status.label}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {new Date(report.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {getPreviewText(report.description)}
                </td>
                <td className="px-6 py-4">
                    <Link
                        to={`${report._id}`}
                        className="text-brand-dark hover:text-brand-base text-sm font-medium"
                    >
                        View Details
                    </Link>
                </td>
            </tr>
        )
    };

    useEffect(() => {
        const fetchUserReports = async () => {
            try {
                setLoading(true);

                const result = await getUserDamageReport(currentPage, reportsPerPage);
                setReports(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserReports();
    }, [currentPage]);
    
    const sortReports = (key) => {
        if (!key) return;
        const sortedData = sortData(reports, key, sortConfig.ascending);
        setReports(sortedData);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        sessionStorage.setItem("damageReportPage", pageNumber);
    };

    return(
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Damage report</Title>
            <p className="text-gray-600 mb-4">
                On this page, you can view the history of your submitted damage reports. 
                Use the table below to track the status of your reports, view details, or submit a new report if necessary.
            </p>
            <LinkButton to ="new" label="Add new report" className="bg-white border-gray-400"></LinkButton>
            <h2 className="font-semibold py-2">Your damage report history:</h2>
            <Table
                        headers={tableHeaders}
                        data={reports}
                        sortConfig={sortConfig}
                        onSort={sortReports}
                        rows={rows}
                        emptyMessage = "You haven't submitted any damage report yet"
            />
            <div className="flex justify-center space-x-2 mt-4">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-brand-dark text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default DamageReport;