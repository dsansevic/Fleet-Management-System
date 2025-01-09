import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import SubmitButton from "@components/ui/SubmitButton";
import SelectField from "@components/form/SelectField";
import { addVehicles } from "@api/vehicles";
import { validateField } from "@utils/inputValidation";
import { validateNotInPast } from "@utils/dateValidation";

const AddVehicleForm = ({ onVehicleAdded }) => {
    const [newVehicle, setNewVehicle] = useState({
        brand: "",
        model: "",
        licensePlate: "",
        status: "available",
        type: "car",
        vehicleInspection: "",
    });
    const [vehicleErrors, setVehicleErrors] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [addError, setAddError] = useState("");
    const inputRef = useRef();

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

        try {
            const addedVehicle = await addVehicles(newVehicle);
            onVehicleAdded(addedVehicle);
            setNewVehicle({
                brand: "",
                model: "",
                licensePlate: "",
                status: "available",
                type: "car",
                vehicleInspection: "",
            });
        } catch (error) {
            setAddError(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <form onSubmit={handleAddVehicle} className="mb-6">
            <div className="grid grid-cols-1">
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
                <FormInputField
                    label="License Plate"
                    name="licensePlate"
                    placeholder="e.x. ST5043-L"
                    value={newVehicle.licensePlate}
                    onChange={handleInputChange}
                    error={vehicleErrors.licensePlate}
                />
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
                <FormInputField
                    label="Vehicle Inspection Date"
                    name="vehicleInspection"
                    type="date"
                    value={newVehicle.vehicleInspection}
                    onChange={handleInputChange}
                    error={vehicleErrors.vehicleInspection}
                />
            </div>
            <SubmitButton readyToSend={isAdding || isSubmitDisabled}>
                {isAdding ? "Adding..." : "Add Vehicle"}
            </SubmitButton>
            {addError && <p className="text-error mt-2">{addError}</p>}
        </form>
    );
};

export default AddVehicleForm;