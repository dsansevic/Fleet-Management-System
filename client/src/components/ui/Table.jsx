const Table = ({ headers, data, rows }) => {
    return (
        <div className="overflow-x-auto shadow-lg shadow-gray-300 rounded-2xl p-2 bg-white">
            <table className="min-w-full border-collapse  bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.name}
                                className={`px-6 py-3 text-center text-sm ${header.visibility}`}
                            >
                                {header.name}
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
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;