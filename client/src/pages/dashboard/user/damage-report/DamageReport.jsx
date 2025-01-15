import { useState, useEffect } from "react";
import { getUserDamageReport } from "@api/damageReports"
import Table from "@components/ui/Table"
import { Link } from "react-router-dom";
import { sortData } from "@utils/sortData"
import LinkButton from "@components/ui/LinkButton"
import Title from "@components/ui/Title";
import GetReservationStatus from "@utils/GetReservationStatus";

const DamageReport = () => {
    const [reports, setReports] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });

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
    };

    useEffect( ()=> {
        const fetchUserReports = async () => {
            try {
                setLoading(true);
                const result = await getUserDamageReport();
                console.log(result)
                setReports(result);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUserReports();
    }, [])

    const sortReports = (key) => {
        if (!key) return;
        const sortedData = sortData(reports, key, sortConfig.ascending);
        setReports(sortedData);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    return(
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Damage report</Title>
            <p className="text-gray-600 mb-4">
                On this page, you can view the history of your submitted damage reports. 
                Use the table below to track the status of your reports, view details, or submit a new report if necessary.
            </p>
            <LinkButton to ="new" label="Add new report" className="bg-brand-base"></LinkButton>
            <h2 className="font-semibold py-2">Your damage report history:</h2>
            <Table
                        headers={tableHeaders}
                        data={reports}
                        sortConfig={sortConfig}
                        onSort={sortReports}
                        rows={rows}
            />
        </div>
    )
}
export default DamageReport;