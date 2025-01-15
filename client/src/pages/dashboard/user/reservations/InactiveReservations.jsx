import { useEffect, useState } from "react";
import { fetchInactiveReservations } from "@api/reservations";
import { Link } from "react-router-dom";
import GetReservationStatus from "@utils/GetReservationStatus";

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

    const sortReservations = (key) => {
        if (!key) return;

        const sortedData = [...reservations].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig.ascending ? -1 : 1;
            if (a[key] > b[key]) return sortConfig.ascending ? 1 : -1;
            return 0;
        });

        setReservations(sortedData);
        setSortConfig({ key, ascending: !sortConfig.ascending });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
                Inactive Reservations
            </h2>
            {error ? (
                <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
            ) : reservations.length === 0 ? (
                <p className="text-gray-500 text-center">No inactive reservations available.</p>
            ) : (
                <div>
                    <table className="min-w-full border-collapse border border-gray-200 shadow-md bg-white">
                    <thead className="bg-brand-dark border border-gray-300 text-white">
                        <tr>
                            {tableHeaders.map((header) => (
                                <th
                                    key={header.name}
                                    className={`px-6 py-3 text-left text-sm cursor-pointer ${header.visibility}`}
                                    onClick={() => header.key && sortReservations(header.key)}
                                    title={header.key ? `Sort by ${header.name}` : ""}
                                >
                                    {header.name}{" "}
                                    {header.key === sortConfig.key &&
                                        (sortConfig.ascending ? "▲" : "▼")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                        <tbody>
                            {reservations.map((res) => {
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
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InactiveReservations;