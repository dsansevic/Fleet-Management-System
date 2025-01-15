import { useState } from "react";
import { validateReservationField } from "@utils/validateReservationField";
import Button from "@components/ui/Button";
import SubmitButton from "@components/ui/SubmitButton";

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
            <div className="flex justify-between">
                <Button
                    className="bg-gray-300 "
                    onClick={onCancel}
                    label = "Cancel"
                />
                <SubmitButton
                    onClick={() => onSave(newEndTime)}
                    readyToSend={isSubmitDisabled}
                >
                    Save Changes
                </SubmitButton>
            </div>
        </div>
    );
};

export default EditReservationForm;