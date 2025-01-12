import { useState } from "react";
import { validateReservationField } from "@utils/validateReservationField";
import TextAreaField from "@components/form/TextAreaField";
import BasicInputField from "@components/form/BasicInputField";

const EditReservationForm = ({ reservation, onSave, onCancel }) => {
    const [updatedData, setUpdatedData] = useState({
        purpose: reservation.purpose || "",
        startTime: reservation.startTime || "",
        endTime: reservation.endTime || "",
        additionalDetails: reservation.additionalDetails || "",
    });

    const [reservationErrors, setReservationErrors] = useState({
        purpose: "",
        startTime: "",
        endTime: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));

        const error = validateReservationField(name, value, updatedData);
        setReservationErrors((prev) => ({ ...prev, [name]: error || "" }));
    };

    const inputField = (label, name, type, value, error) => (
        <div>
            <label className="block text-gray-700 text-sm">{label}</label>
            <input
                type={type}
                name={name}
                value={type === "datetime-local" ? new Date(value).toISOString().slice(0, -1) : value}
                className={`w-full text-sm border p-2 rounded ${error ? "border-red-500" : ""}`}
                onChange={handleInputChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );

    const hasErrors = Object.values(reservationErrors).some((error) => error);
    const isSubmitDisabled = hasErrors;

    return (
        <div className="mt-6 space-y-4">
            <BasicInputField
                label="Purpose"
                name="purpose"
                type="text"
                value={updatedData.purpose}
                error={reservationErrors.purpose}
                onChange={handleInputChange}
            />
            <BasicInputField
                label="Start Time"
                name="startTime"
                type="datetime-local"
                value={updatedData.startTime}
                error={reservationErrors.startTime}
                onChange={handleInputChange}
            />
            <BasicInputField
                label="End Time"
                name="endTime"
                type="datetime-local"
                value={updatedData.endTime}
                error={reservationErrors.endTime}
                onChange={handleInputChange}
            />            
            <TextAreaField
                label="Additional Details"
                name="additionalDetails"
                value={updatedData.additionalDetails}
                onChange={handleInputChange}
                rows = {2}
            />
            <div className="flex">
                <button
                    className={`bg-brand-base text-white px-4 py-2 rounded ${isSubmitDisabled ? "opacity-50" : ""}`}
                    onClick={() => onSave(updatedData)}
                    disabled={isSubmitDisabled}
                >
                    Save Changes
                </button>
                <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditReservationForm;