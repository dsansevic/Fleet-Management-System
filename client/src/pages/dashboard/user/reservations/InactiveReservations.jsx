import { useEffect, useState } from "react";
import { fetchInactiveReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";
import Table from "@components/ui/Table";
import { sortData } from "@utils/sortData"

const InactiveReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });

    const tableHeaders = [
        { name: "Purpose", key: "purpose", visibility: "" },
        { name: "Status", key: "status", visibility: "" },
        { name: "Start Time", key: "startTime", visibility: "hidden lg:table-cell" },
        { name: "End Time", key: "endTime", visibility: "hidden sm:table-cell" },
        { name: "See Details", key: null, visibility: "" }
    ];

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const inactiveReservations = await fetchInactiveReservations();
                setReservations(inactiveReservations);
            } catch (error) {
                setError(error.message);
            }
        };

        loadReservations();
    }, []);

    const rows = (res) => {
        const status = GetReservationStatus(res.status);
        return (
            <tr key={res._id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {res.purpose}
                </td>
                <td className="px-6 py-4 text-sm font-medium capitalize flex items-center space-x-2">
                    {status.icon}
                    <span>{status.label}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {new Date(res.startTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {new Date(res.endTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                    <Link
                        to={`/dashboard-user/reservation/${res._id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        View Details
                    </Link>
                </td>
            </tr>
        );
    };

    const handleSort = (key) => {
        if (!key) return;
        const sortedData = sortData(reservations, key, sortConfig.ascending);
        setReservations(sortedData);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                Inactive Reservations
            </h2>
            <p className="text-gray-600 mb-4">
                Here you can find a list of all your past reservations, including completed, canceled, 
                rejected or unresolved ones.<br/> You can check reservations details, but editing or reactivating 
                them isn’t possible.
            </p>
            {error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : (
                <Table
                    headers={tableHeaders}
                    data={reservations}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    rows={rows}
                    emptyMessage = "You have no inactive reservations at the moment."
                />
            )}
        </div>
    );
};

export default InactiveReservations;