import usePagination from "@hooks/usePagination";
import { getEmployees } from '@api/employees';
import Pagination from "@utils/Pagination";
import Loading from "@utils/Loading";

const EmployeeList = () => {
    const { data: employees, error, loading, totalPages, currentPage, handlePageChange } =
            usePagination(getEmployees, null, 9);

    return (
        <div className=" mx-auto mt-6 bg-white shadow-lg rounded-2xl p-6">
             {loading ? (
                    <Loading />
                ) : error ? (
                    <p className="text-error bg-red-100 p-4 rounded-md">{error}</p>
                ) : employees.length === 0 ? (
                    <p className="text-gray-600 text-center">No employees registered.</p>
                ) : (
            <>              
            <div className="max-w-5xl mx-auto">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {employees.map((employee) => (
                        <li
                            key={employee.email}
                            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                                👤
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-800">
                                    {employee.firstName} {employee.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{employee.email}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                handlePageChange={handlePageChange} 
            />
            </>  
            )}
        </div>
    );
};

export default EmployeeList;
