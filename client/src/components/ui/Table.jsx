const Table = ({ headers, data, rows }) => {
    return (
        <div>
            <table className="min-w-full border-collapse bg-white rounded-2xl">
                <thead className="bg-brand-dark text-white">
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