const EmployeeList = ({ employees, error, loading }) => {
    if (loading) {
        return <div className="text-center text-gray-600">Loading employees...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <ul className="bg-white shadow-md rounded-md p-4">
            {employees.map((employee) => (
                <li
                
                    key={employee.email}
                    className="border-b last:border-0 py-2 px-4 hover:bg-gray-100"
                >
                    <div className="font-semibold">{employee.firstName} {employee.lastName}</div>
                    <div className="text-sm text-gray-600">{employee.email}</div>
                </li>
            ))}
        </ul>
    );
};

export default EmployeeList;
