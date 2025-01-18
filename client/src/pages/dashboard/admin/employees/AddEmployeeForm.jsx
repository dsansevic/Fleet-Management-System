import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/ui/SubmitButton"
import { addEmployee } from "@api/employees"; 
import { validateField } from "@utils/inputValidation";
import {publicApiClient} from '@api/apiClient'
import { useNavigate } from "react-router-dom";
import SuccessMessage from "@components/ui/SuccessMessage";
import ErrorMessage from "@components/ui/ErrorMessage";
import Title from "@components/ui/Title";

const AddEmployeeForm = () => {
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
    const [credentialsToShow, setCredentialsToShow] = useState(null)
    const [capsLockIsOn, setCapsLockIsOn] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [addError, setAddError] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();

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
        setCredentialsToShow(null);

        try {
            await addEmployee(newEmployee);

            setCredentialsToShow({
                email: newEmployee.email,
                password: newEmployee.password,
            });
            setSuccessMessage("Employee successfully added!");
            setNewEmployee({ firstName: "", lastName: "", email: "", password: "" }); 
        } catch (error) {
            setAddError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-8 relative">
            <button onClick={() => navigate("/dashboard-admin/employees")} className="absolute top-0 right-0 text-xl">
                ✖
            </button>
            <Title className="text-center">Add a New Employee</Title>
            
            {successMessage && <SuccessMessage message={successMessage} />}
            {addError && <ErrorMessage message={addError} />}
            {credentialsToShow && (
                <div className="mt-6 p-4 border border-gray-100 rounded-md text-center">
                    <p><strong>Email:</strong> {credentialsToShow.email}</p>
                    <p><strong>Password:</strong> {credentialsToShow.password}</p>
                    <p className="text-sm text-error mt-2">
                        ⚠️ These credentials will not be shown again    
                    </p>
                </div>
            )}
            <form onSubmit={handleAddEmployee} className="space-y-6">
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
            </div>
            {capsLockIsOn && (
            <div className="mt-2 p-2 text-brand-darker text-sm font-medium rounded-md flex items-center gap-2 animate-pulse">
                ⚠️ Caps Lock is ON! 
            </div>
)}
            <div className="flex justify-end">
                <SubmitButton readyToSend={isAdding || isSubmitDisabled}>
                    {isAdding ? "Adding..." : "Add Employee"}
                </SubmitButton>
            </div>
        </form>
    </div>
    );
};

export default AddEmployeeForm;