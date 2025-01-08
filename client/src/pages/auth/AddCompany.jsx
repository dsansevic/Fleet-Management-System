import React from "react";
import FormInputField from "@components/form/FormInputField";
import { validateField } from "@utils/inputValidation";
import SubmitButton from "@components/ui/SubmitButton";
import { useState, useRef, useEffect } from "react";

const AddCompany = ({ companyName, setCompanyName, onBack, onSubmit, isLoading }) => {

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [companyNameError, setCompanyNameError] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (e) => {
        const { value } = e.target;
            setCompanyName(value);
            setCompanyNameError(validateField("name", value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitDisabled) return;

        onSubmit();
    };

    const isSubmitDisabled = !companyName || !acceptTerms || companyNameError 


    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">STEP 2: Add Your Company</h1>
            <p className="text-gray-600 mb-6">
                Now you can register the company!
            </p>
            <div className="mb-6 bg-background px-4 py-2 rounded-lg border-l-4 border-brand-dark ">
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Enter your company name and accept the terms and conditions.</li>
                    <li>Once the company is successfully added, you can:
                        <ul className="list-inside list-disc ml-6">
                            <li>Register employees associated with the company</li>
                            <li>Assign each employee their login credentials</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <FormInputField
                    label="Company Name"
                    name="name"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={handleInputChange}
                    error={companyNameError}
                    ref={inputRef}
                />
                <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="mr-2"
                />
                <label className="text-sm"> I agree to the{" "}
                    <span className="text-brand-base cursor-pointer"
                    // onClick={() => setShowTermsLink(!showTermsLink)}
                    >
                        terms and conditions
                    </span>.  
                    <span className="text-error" title="This field is required">*</span>
                </label>
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-fit py-2 px-5 mt-2 border-l-2 border-b border-brand-dark bg-brand-base rounded-3xl text-white hover:bg-brand-light"
                    >
                        Back
                    </button>
                    <SubmitButton readyToSend={isSubmitDisabled && !isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default AddCompany;
