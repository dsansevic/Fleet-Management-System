import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import { useNavigate } from "react-router-dom";
import SubmitButton from "@components/ui/SubmitButton";
import SelectField from "@components/form/SelectField";
import SuccessMessage from "@components/ui/SuccessMessage";
import Title from "@components/ui/Title";
import { addVehicles } from "@api/vehicles";
import { validateField } from "@utils/inputValidation";
import { validateNotInPast } from "@utils/dateValidation";
import ErrorMessage from "@components/ui/ErrorMessage";

const AddVehicleForm = () => {
    const [newVehicle, setNewVehicle] = useState({
        brand: "",
        model: "",
        licensePlate: "",
        status: "available",
        type: "car",
        capacity: 4,
        vehicleInspection: "",
    });
    const [vehicleErrors, setVehicleErrors] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [addError, setAddError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();

    const hasErrors = Object.values(vehicleErrors).some((error) => error);
    const hasEmptyFields = Object.values(newVehicle).some((value) => value === "");
    const isSubmitDisabled = hasErrors || hasEmptyFields;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle((prev) => ({ ...prev, [name]: value }));

        if (name === "vehicleInspection") {
            const errorInPast = validateNotInPast(value);

            if (errorInPast) {
                setVehicleErrors((prev) => ({
                    ...prev,
                    vehicleInspection: errorInPast, 
                }));
                return;
            }
        
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(new Date().getFullYear() + 1);
        
            const inspectionDate = new Date(value);
        
            if (inspectionDate > oneYearFromNow) {
                setVehicleErrors((prev) => ({
                    ...prev,
                    vehicleInspection: "Inspection date must be within one year from today.",
                }));
                return;
            }
        }

        const error = validateField(name, value);
        setVehicleErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        setAddError("");
        setSuccessMessage("");

        try {
            const addedVehicle = await addVehicles(newVehicle);
            setSuccessMessage("Vehicle successfully added!");
            setNewVehicle({
                brand: "",
                model: "",
                licensePlate: "",
                status: "available",
                type: "car",
                capacity: 4,
                vehicleInspection: "",
            });
        } catch (error) {
            setAddError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-8 relative">
            <button onClick={() => navigate("/dashboard-admin/vehicles")} className="absolute top-0 right-0 text-xl">
            ✖
            </button>
            <Title className="text-center">Add a New Vehicle</Title>
            {successMessage && <SuccessMessage message={successMessage} />}
            {addError && <ErrorMessage message={addError}/>}
            <form onSubmit={handleAddVehicle} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInputField
                        label="Brand"
                        name="brand"
                        placeholder="e.x. BMW"
                        value={newVehicle.brand}
                        onChange={handleInputChange}
                        error={vehicleErrors.brand}
                        ref={inputRef}
                    />
                    <FormInputField
                        label="Model"
                        name="model"
                        placeholder="e.x. X3"
                        value={newVehicle.model}
                        onChange={handleInputChange}
                        error={vehicleErrors.model}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInputField
                        label="License Plate"
                        name="licensePlate"
                        placeholder="e.x. ST5043-L"
                        value={newVehicle.licensePlate}
                        onChange={handleInputChange}
                        error={vehicleErrors.licensePlate}
                    />
                    <FormInputField
                        label="Capacity (number of seats)"
                        type="number"
                        name="capacity"
                        placeholder="e.x. 4"
                        value={newVehicle.capacity}
                        onChange={handleInputChange}
                        error={vehicleErrors.capacity}
                    />
                 </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
                    <SelectField
                        label="Type"
                        name="type"
                        value={newVehicle.type}
                        onChange={handleInputChange}
                        error={vehicleErrors.type}
                        placeholder="Select vehicle type"
                        options={[
                            { value: "car", label: "Car" },
                            { value: "truck", label: "Truck" },
                            { value: "van", label: "Van" },
                            { value: "motorcycle", label: "Motorcycle" },
                            { value: "bus", label: "Bus" },
                        ]}
                    />
                    <SelectField
                        label="Status"
                        name="status"
                        value={newVehicle.status}
                        onChange={handleInputChange}
                        error={vehicleErrors.status}
                        placeholder="Select status"
                        options={[
                            { value: "available", label: "Available" },
                            { value: "occupied", label: "Occupied" },
                            { value: "service", label: "Service" },
                        ]}
                    />
                </div>
                    <FormInputField
                        label="Vehicle Inspection Date"
                        name="vehicleInspection"
                        type="date"
                        value={newVehicle.vehicleInspection}
                        onChange={handleInputChange}
                        error={vehicleErrors.vehicleInspection}
                    />
                <div className="flex justify-end">
                    <SubmitButton readyToSend={isAdding || isSubmitDisabled}>
                        {isAdding ? "Adding..." : "Add Vehicle"}
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default AddVehicleForm;