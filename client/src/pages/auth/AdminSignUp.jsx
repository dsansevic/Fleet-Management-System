import FormInputField from "@components/form/FormInputField"
import { validateField } from "@utils/inputValidation";
import SubmitButton from "@components/ui/SubmitButton";
import { useState, useRef, useEffect } from "react";
import {publicApiClient} from '@api/apiClient'

function AdminSignUp({ userData, setUserData, onNext }) {

    const [userErrors, setUserErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const [capsLockIsOn, setCapsLockIsOn] = useState(false);
    const [errorAlert, setErrorAlert] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCapsLock = (isCapsOn) => setCapsLockIsOn(isCapsOn);  

    const hasErrors = Object.values(userErrors).some((error) => error);
    const hasEmptyFields = Object.values(userData).some((value) => value === "");
    const isSubmitDisabled = hasErrors || hasEmptyFields

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        
        setUserData((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setUserErrors((prev) => ({ ...prev, [name]: error }));
        
        if (name === "password" || name === "confirmPassword") {
            const passwordsMismatch =
                (name === "password" && userData.confirmPassword && value !== userData.confirmPassword) ||
                (name === "confirmPassword" && value !== userData.password);

            setUserErrors((prev) => ({
                ...prev,
                confirmPassword: passwordsMismatch ? "Passwords do not match." : "",
            }));
        }

        if (name === "email" && !error) {
            await checkAvailability(value);
        }
    };

    const checkAvailability = async (value) => {
        try {
            await publicApiClient.post('/user/check-availability', {
                email: value });
        } catch (error) {
            if (error.response?.status === 400) {
                setUserErrors((prev) => ({
                    ...prev,
                    email: error.response.data.message,
                }));
            }
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(userErrors).some((error) => error);
        if (hasErrors) {
            setErrorAlert("Please fix all errors before proceeding.");
            setTimeout(() => {
                setErrorAlert("");
              }, "3000");
            return;
        }

        onNext();
    };

    return (
        <div className="flex gap-9 p-4 bg-white rounded-lg shadow-md">
            <div className="w-full md:w-2/5 mb-6 bg-background p-4 rounded-lg border-l-4 border-brand-dark">
                <h2 className="font-bold text-brand-dark text-xl">STEP 1: Sign up</h2>
                <p className="text-gray-700 mt-2">
                    Let's start by setting up your account.
                    Once you've completed this step, you'll move on to adding your company.
                </p>
            </div>

            <form onSubmit={handleNext} className="w-full md:w-3/5">
                <FormInputField
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    error={userErrors.firstName}
                    ref={inputRef}
                />
                <FormInputField
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    error={userErrors.lastName}
                />
                <FormInputField
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={handleInputChange}
                    error={userErrors.email}
                />
                <FormInputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={handleInputChange}
                    error={userErrors.password}
                    onCapsLock={handleCapsLock}
                />
                {capsLockIsOn && (
                    <p className='text-error text-sm mt-1'>Caps Lock is ON!</p>)}

                <FormInputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    error={userErrors.confirmPassword}
                    onCapsLock={handleCapsLock}
                />
                <div className="text-center mb-8">
                    <p className='text-error text-sm mt-1'>{errorAlert}</p>
                    <SubmitButton readyToSend={isSubmitDisabled}>
                                            Continue
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}
export default AdminSignUp;