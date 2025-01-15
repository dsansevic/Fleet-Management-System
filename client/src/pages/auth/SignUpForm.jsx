import { useState } from "react";
import AdminSignUp from "./AdminSignUp";
import AddCompany from "./AddCompany";
import fleetflowLogo from '@assets/logo.png'; 
import {apiClient} from '@api/apiClient'
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import ErrorMessage from "@components/ui/ErrorMessage";

const SignUpForm = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();
    const {dispatch} = useAuthContext();

    const handleSubmit = async () => {
        const {firstName, lastName, email, password} = userData;
        const dataToSend = { firstName, lastName, email, password, companyName}

        try {
            const response = await apiClient.post("/user/admin-company-signup", dataToSend);
            setSignUpError("")
            dispatch({ type: "LOGIN", payload: response.data.user });
            navigate("/dashboard-admin");
        } catch (error) {
            console.error("Error during registration:", error);

            setSignUpError(
            error.response?.data?.message || "An unexpected error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        };
    }   

    return (
        <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-lg shadow-md shadow-gray-300 relative z-10">
            <div className="flex items-center justify-center mb-2 ">
            <h1 className="text-3xl font-semibold mr-2">Get started with </h1>
                <Link to="/" >
                    <img src={fleetflowLogo} alt="FleetFlow" className="w-40 cursor-pointer" />
                </Link>
            </div>
            <div className="text-center mb-2">Already connected to a company? 
                    <Link to="/login">
                    <span className="text-brand-base cursor-pointer"> Log in</span>
                    </Link>
            </div>

            {signUpError && <ErrorMessage message={signUpError}  onClose={() => setSignUpError("")}/>}
        
            {step === 1 && (
                <AdminSignUp
                    userData={userData}
                    setUserData={setUserData}
                    onNext={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <AddCompany
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    onBack={() => setStep(1)}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default SignUpForm;
