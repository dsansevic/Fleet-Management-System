import { getUserDamageReport } from "@api/damageReports"
import Table from "@components/ui/Table"
import { Link } from "react-router-dom";
import LinkButton from "@components/ui/LinkButton"
import Title from "@components/ui/Title";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";
import usePagination from "@hooks/usePagination";
import { formatDate } from "@utils/formatDate"
import Pagination from "@utils/Pagination"
import Loading from "@utils/Loading"; 

const DamageReport = () => {
    const {data: reports, error, loading, totalPages, currentPage, handlePageChange} 
        = usePagination(getUserDamageReport,"damageReportPage", 6 )

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
                    {formatDate(report.createdAt)}
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

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Damage report</Title>
            <p className="text-gray-600 mb-4">
                On this page, you can view the history of your submitted damage reports. 
                Use the table below to track the status of your reports, view details, or submit a new report if necessary.
            </p>
            <LinkButton to ="new" className="bg-white shadow">
                Add new report
            </LinkButton>
            <h2 className="font-semibold py-2">Your damage report history:</h2>
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : (
                <>
                    <Table
                        headers={tableHeaders}
                        data={reports}
                        rows={rows}
                    />
                    <Pagination 
                        totalPages = {totalPages} 
                        currentPage = {currentPage}
                        handlePageChange = {handlePageChange}
                    />
                </>
            )}
        </div>
    )
}
export default DamageReport;