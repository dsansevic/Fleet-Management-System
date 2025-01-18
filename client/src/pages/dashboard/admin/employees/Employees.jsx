import EmployeeList from "./EmployeeList";
import Title from "@components/ui/Title"
import LinkButton from "@components/ui/LinkButton"

const Employees = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Title>Employees</Title>
            <p className="text-gray-700 mb-4">
                As an Admin, you have full control over employee registrations. Employees 
                <span className="font-medium"> cannot self-register</span>, ensuring only verified members gain access.
            </p>

            <div className="border-l-4 border-brand-dark pl-4 py-2 bg-purple-50 text-gray-700 mb-4">
                <p className="font-bold">Credentials Are Shown Only Once</p>
                <p>After adding an employee, their login details will be visible just once. Share them securely and advise them to change their password immediately.</p>
                <p className="text-sm text-gray-500">
                If lost, credentials cannot be retrieved.
            </p>
            </div>

            <LinkButton to ="new" label="Add employee" className="bg-white shadow"></LinkButton>
           
            <EmployeeList />
        </div>
    );
};

export default Employees;