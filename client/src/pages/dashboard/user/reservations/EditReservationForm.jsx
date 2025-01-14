import { useState } from "react";
import { validateReservationField } from "@utils/validateReservationField";

const EditReservationForm = ({ reservation, onSave, onCancel }) => {
    const [newEndTime, setNewEndTime] = useState("");
    const [newEndTimeError, setNewEndTimeError] = useState("");

    const handleInputChange = (e) => {
        const { value } = e.target;
        setNewEndTime(value);
        console.log(newEndTime)

        const error = validateReservationField("newEndTime", value, reservation);
        console.log(error)
        setNewEndTimeError(error || "");
    };

    const isSubmitDisabled = newEndTimeError || !newEndTime

    return (
        <div className="mt-6 space-y-4">
            <span>You can change the end time. </span>
            <div>
                <label className="block text-gray-700 text-sm">New End Time</label>
                <input
                    type="datetime-local"
                    name="newEndTime"
                    value={newEndTime}
                    className={`w-full text-sm border p-2 rounded ${
                        newEndTimeError ? "border-error" : ""
                    }`}
                    onChange={handleInputChange}
                />
                {newEndTimeError && <p className="text-error text-sm mt-1">{newEndTimeError}</p>}
            </div>                      
            <div className="flex">
                <button
                    className={`bg-brand-base text-white px-4 py-2 rounded ${isSubmitDisabled ? "opacity-50" : ""}`}
                    onClick={() => onSave(newEndTime)}
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