import EmployeeList from "./EmployeeList";
import AddEmployeeForm from "./AddEmployeeForm";
import SubmitButton from "@components/ui/SubmitButton";
import { getEmployees } from '@api/employees';
import { useState, useEffect } from 'react'

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isAddNewVisible, setIsAddNewVisible] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const data = await getEmployees();
                setEmployees(data);
                setError("");
            } catch (error) {
                setError(error.message);
                console.log("uhvatio error")
            } finally {
                setLoading(false);
                console.log("Loading finished");
            }
        };

        fetchEmployees();
    }, []);

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    return (
        <div className="mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Employees</h1>
            <div className="mb-4">
                <SubmitButton type = "button" onClick={() => setIsAddNewVisible(!isAddNewVisible)}>
                {isAddNewVisible ? "Close" : "Add new employee"} </SubmitButton>
                {isAddNewVisible && (
                    <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />
                    )}
            </div>
            <EmployeeList employees={employees} error={error} loading={loading} />
        </div>
    );
};

export default Employees;