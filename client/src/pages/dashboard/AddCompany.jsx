import { useState } from "react";
import FormInputField from "@components/form/FormInputField"
import SubmitButton from "@components/form/SubmitButton";
import { validateField } from "@utils/inputValidation"

const AddCompany = () => {
    const [name, setName] = useState("");
    const [oib, setOib] = useState("");
    const [nameError, setNameError] = useState("");
    const [oibError, setOibError] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError(validateField("name", e.target.value));
    }
    
    const handleOibChange = (e) => {
        setOib(e.target.value);
        setOibError(validateField("oib", e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, oib);
    }

    const isSubmitDisabled = !name || !oib || nameError || oibError;
    return(
        <div className="p-6 bg-white">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Your Company</h1>
            <p className="text-gray-600 mb-6">
            Use this form to add a new company to the Fleet Management System. Please ensure that the
            details are accurate.
            </p>
            <div className="mb-6 bg-background p-4 rounded-lg border-l-4 border-brand-dark w-2/3">
            <h2 className="font-bold text-brand-dark">Instructions:</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Fill in the company name and unique identification number (OIB).</li>
                <li>Click "Add" to save the company to the system.</li>
                <li>Once the company has been successfully added, you can:</li>
                <ul className="list-inside list-disc ml-6">
                <li>Register employees associated with the company.</li>
                <li>Assign each employee their login credentials.</li>
                <li>Provide employees with instructions for logging in.</li>
                </ul>
            </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
                <FormInputField 
                    label="Name"
                    name = {name}
                    placeholder = "Enter company name" 
                    value = {name}
                    onChange = {handleNameChange}
                    error = {nameError}
                />
                <FormInputField 
                    label="OIB"
                    name = {oib}
                    placeholder = "Enter valid oib (11 digits)" 
                    value = {oib}
                    onChange = {handleOibChange}
                    error = {oibError}
                />
                <SubmitButton readyToSend={isSubmitDisabled}>Add</SubmitButton>
            </form>
        </div>
    )
}

export default AddCompany;