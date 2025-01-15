import FormInputField from "@components/form/FormInputField";
import { validateField } from "@utils/inputValidation";
import SubmitButton from "@components/ui/SubmitButton";
import Button from "@components/ui/Button";
import { useState, useRef, useEffect } from "react";

const AddCompany = ({ companyName, setCompanyName, onBack, onSubmit, isLoading }) => {

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

    const isSubmitDisabled = !companyName || companyNameError 

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">STEP 2: Add Your Company</h1>
            <p className="text-gray-600 mb-6">
                Now you can register the company!
            </p>
            <div className="mb-6 bg-background px-4 py-2 rounded-lg border-l-4 border-brand-dark">
                <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                    Once the company is successfully added, you can:
                        <ul className="list-inside list-disc ml-6">
                            <li>register employees associated with the company</li>
                            <li>assign each employee their login credentials</li>
                        </ul>
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
                <div className="flex justify-between mt-4">
                    <Button
                        label="Go back"
                        onClick={onBack}
                        className="bg-gray-100 border-gray-300"
                    >
                        Back
                    </Button>
                    <SubmitButton readyToSend={isSubmitDisabled && !isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default AddCompany;
