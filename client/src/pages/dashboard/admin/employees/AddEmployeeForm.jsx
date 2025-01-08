import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/ui/SubmitButton"
import { addEmployee } from "@api/employees"; 
import { validateField } from "@utils/inputValidation";
import {publicApiClient} from '@api/apiClient'

const AddEmployeeForm = ({ onEmployeeAdded }) => {
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [employeeErrors, setEmployeeErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [capsLockIsOn, setCapsLockIsOn] = useState(false);
    const [addError, setAddError] = useState("");
    const inputRef = useRef();

    const hasErrors = Object.values(employeeErrors).some((error) => error);
    const hasEmptyFields = Object.values(newEmployee).some((value) => value === "");
    const isSubmitDisabled = hasErrors || hasEmptyFields

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCapsLock = (isCapsOn) => setCapsLockIsOn(isCapsOn);  

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        setNewEmployee((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setEmployeeErrors((prev) => ({ ...prev, [name]: error }));
        if (name === "email" && !error) {
            await checkAvailability(value);
        }
    };

    const checkAvailability = async (value) => {
        try {
            await publicApiClient.post('/user/check-availability', {
                email: value });
            setEmployeeErrors((prev) => ({ ...prev, email: "" }));
        } catch (error) {
            if (error.response?.status === 400) {
                setEmployeeErrors((prev) => ({
                    ...prev,
                    email: error.response.data.message,
                }));
            }
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        setAddError("");

        try {
            const addedEmployee = await addEmployee(newEmployee);
            onEmployeeAdded(addedEmployee);
            setNewEmployee({ firstName: "", lastName: "", email: "", password: "" }); 
        } catch (error) {
            setAddError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <form onSubmit={handleAddEmployee} className="mb-6">
            <div className="grid grid-cols-1">
                <FormInputField
                    label = "First name"
                    name = "firstName"
                    placeholder  = "Enter first name"
                    value = {newEmployee.firstName}
                    onChange={handleInputChange}
                    error={employeeErrors.firstName}
                    ref={inputRef}
                />
                <FormInputField
                    label = "Last name"
                    name = "lastName"
                    placeholder  = "Enter last name"
                    value = {newEmployee.lastName}
                    onChange={handleInputChange}
                    error={employeeErrors.lastName}
                />
                <FormInputField
                    label = "Email"
                    name = "email"
                    placeholder  = "Enter email"
                    value = {newEmployee.email}
                    onChange={handleInputChange}
                    error={employeeErrors.email}
                />
                <FormInputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Generate a password for the user"
                    value={newEmployee.password}
                    onChange={handleInputChange}
                    onCapsLock={handleCapsLock}
                    error={employeeErrors.password}
                />
                {capsLockIsOn && (
                    <p className='text-error text-sm mt-1'>Caps Lock is ON!</p>)}
            </div>
            <SubmitButton 
                readyToSend={isAdding || isSubmitDisabled}>
                {isAdding ? "Adding..." : "Add Employee"}
                
            </SubmitButton>

            {addError && <p className="text-red-500 mt-2">{addError}</p>}
        </form>
    );
};

export default AddEmployeeForm;