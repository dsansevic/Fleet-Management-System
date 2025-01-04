import { useState } from "react";
import FormInputField from "@components/form/FormInputField"
import SubmitButton from "@components/form/SubmitButton";
import { validateField } from "@utils/inputValidation"
import apiClient from "@api/apiClient";

const AddCompany = () => {
    const [name, setName] = useState("");
    const [oib, setOib] = useState("");
    const [nameError, setNameError] = useState("");
    const [oibError, setOibError] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError(validateField("name", e.target.value));
    }
    
    const handleOibChange = async (e) => {
        setOib(e.target.value);
        setOibError(validateField("oib", e.target.value));

        await checkAvailability(e.target.value);
    }

    const checkAvailability = async (value) => {
        try {
            const response = await apiClient.post('http://localhost:3000/company/check-availability', {
                oib: value,
            });
        } catch (error) {
            if (error.response && error.response.status === 400)
                setOibError(error.response.data.message)
            }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitDisabled) return

        try {
            const response = await apiClient.post("/company/add-company", { name, oib });
            setName("")
            setOib("");
        } catch (error) {
            console.log(error)
        } 
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