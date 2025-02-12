import EmployeeList from "./EmployeeList";
import Title from "@components/ui/Title"
import LinkButton from "@components/ui/LinkButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Employees = () => {
    return (
        <div className="p-6 w-full mx-auto">
            <Title>Employees</Title>
            <p className="text-gray-700 mb-4">
                As an Admin, you have full control over employee registrations. Employees 
                <span className="font-bold"> cannot self-register</span>, ensuring only verified members gain access.
            </p>

            <div className="border-l-4 border-brand-dark rounded-2xl pl-4 py-2 bg-white text-gray-700 mb-4">
                <p className="font-bold">Credentials are shown only once!</p>
                <p>After adding an employee, their login details will be visible just once. Share them securely!</p>
                <p className="text-sm text-gray-500">
                If lost, credentials cannot be retrieved.
            </p>
            </div>

            <LinkButton to ="new" className="border-0 bg-white shadow-sm shadow-brand-dark">
                <FontAwesomeIcon icon={faUserPlus} />   Add employee
            </LinkButton>

            <EmployeeList />
        </div>
    );
};

export default Employees;