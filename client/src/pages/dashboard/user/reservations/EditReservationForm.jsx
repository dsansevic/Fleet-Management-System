import { useState, useEffect, useRef } from "react";
import { validateReservationField } from "@utils/validateReservationField";
import Button from "@components/ui/Button";
import SubmitButton from "@components/ui/SubmitButton";

const EditReservationForm = ({ reservation, onSave, onCancel }) => {
  const [newEndTime, setNewEndTime] = useState("");
  const [newEndTimeError, setNewEndTimeError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewEndTime(value);

    const error = validateReservationField("newEndTime", value, reservation);
    console.log(error);
    setNewEndTimeError(error || "");
  };

  const isSubmitDisabled = newEndTimeError || !newEndTime;

  return (
    <div className="mt-6 space-y-4">
      <span className="text-brand-darker ">Propose new end time: </span>
      <input
        type="datetime-local"
        name="newEndTime"
        value={newEndTime}
        ref={inputRef}
        className={`w-full text-sm border focus:outline-none focus:ring-1 focus:ring-brand-light p-2 rounded-base shadow ${
          newEndTimeError ? "border-error" : ""
        }`}
        onChange={handleInputChange}
      />
      {newEndTimeError && (
        <p className="text-error text-sm mt-1">{newEndTimeError}</p>
      )}
      <div className="flex justify-between">
        <Button className="h-10 mt-2" onClick={onCancel} label="Cancel" />
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
