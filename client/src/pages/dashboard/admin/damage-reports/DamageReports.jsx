import { useState, useEffect } from "react";
import FilterDamageReports from "./FilterDamageReports";
import { getDamageReport } from "@api/damageReports";
import Table from "@components/ui/Table";
import { sortData } from "@utils/sortData";
import { capitalizedFirstLetter } from "@utils/capitalizedFirstLetter";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";

const DamageReports = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });

    const tableHeaders = [
        { name: "Vehicle", key: "vehicle", visibility: "" },
        { name: "Status", key: "status", visibility: "" },
        { name: "Reported By", key: "reportedBy", visibility: "" },
        { name: "Date Reported", key: "createdAt", visibility: "hidden lg:table-cell" },
        { name: "Description", key: "description", visibility: "hidden lg:table-cell" },
        { name: "Details", key: null, visibility: "" },
    ];

    useEffect(() => {
        const loadDamageReports = async () => {
            try {
                const damageReports = await getDamageReport();
                setReports(damageReports);
                setFilteredReports(damageReports);
            } catch (error) {
                console.error("Error fetching damage reports:", error);
                setError(error.message);
            }
        };
        loadDamageReports();
    }, []);

    const sortReports = (key) => {
        if (!key) return;
        const sortedData = sortData(filteredReports, key, sortConfig.ascending);
        setFilteredReports(sortedData);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    const rows = (report) => {
        const status = GetReservationStatus(report.status);
        return (
            <tr
                key={report._id}
                className="border-b border-gray-300 hover:bg-gray-50"
            >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {report.reservation?.vehicle?.brand}{" "}
                    {report.reservation?.vehicle?.model}
                </td>
                <td className="px-6 py-4 text-sm font-medium capitalize flex items-center gap-1">
                    {status.icon}
                    <span>{status.label}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                    {capitalizedFirstLetter(report.reportedBy?.firstName)}.{" "}
                    {report.reportedBy?.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {new Date(report.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {report.description}
                </td>
                <td className="px-6 py-4">
                    <Link
                        to={`${report._id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        View Details
                    </Link>
                </td>
            </tr>
        )
    }

    return (
        <div className="p-12 mx-auto overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                Damage Reports
            </h2>
            {error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : (
                <>
                    {/* <FilterDamageReports
                        reports={reports}
                        setFilteredReports={setFilteredReports}
                    /> */}
                    <Table
                        headers={tableHeaders}
                        data={filteredReports}
                        sortConfig={sortConfig}
                        onSort={sortReports}
                        rows={rows}
                        emptyMessage = "No reports have been submitted yet."
                    />
                </>
            )}
        </div>
    );
};

export default DamageReports;