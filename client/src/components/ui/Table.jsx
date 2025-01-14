const Table = ({ headers, data, sortConfig, onSort, rows }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200 shadow-md bg-white">
                <thead className="bg-brand-dark border border-gray-300 text-white">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.name}
                                className={`px-6 py-3 text-left text-sm cursor-pointer ${header.visibility}`}
                                onClick={() => header.key && onSort(header.key)}
                                title={header.key ? `Sort by ${header.name}` : ""}
                            >
                                {header.name}{" "}
                                {header.key === sortConfig?.key &&
                                    (sortConfig.ascending ? "▲" : "▼")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map(rows)
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-4">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;