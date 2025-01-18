import { getDamageReport } from "@api/damageReports";
import Table from "@components/ui/Table";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import { getPreviewText } from "@utils/getPreviewText";
import usePagination from "@hooks/usePagination";
import { formatDate } from "@utils/formatDate";
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";

const DamageReports = () => {
    const { data: reports, error, loading, totalPages, currentPage, handlePageChange } =
        usePagination(getDamageReport, "damageReportsPage", 5);

    const tableHeaders = [
        { name: "Vehicle", key: "vehicle", visibility: "" },
        { name: "Status", key: "status", visibility: "" },
        { name: "Reported By", key: "reportedBy", visibility: "" },
        { name: "Date Reported", key: "createdAt", visibility: "hidden lg:table-cell" },
        { name: "Description", key: "description", visibility: "hidden lg:table-cell" },
        { name: "Details", key: null, visibility: "" },
    ];

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
                    <Link to={`${report._id}`} className="text-brand-dark hover:text-brand-base text-sm font-medium">
                        View Details
                    </Link>
                </td>
            </tr>
        );
    };

    return (
        <div className="p-12 mx-auto overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Damage Reports</h2>
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : (
                <>
                    <Table headers={tableHeaders} data={reports} rows={rows} emptyMessage="No reports have been submitted yet." />
                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                </>
            )}
        </div>
    );
};

export default DamageReports;