import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import TextAreaField from "@components/form/TextAreaField";
import SubmitButton from "@components/ui/SubmitButton";
import { addReservation } from "@api/reservations";
import { validateField } from "@utils/inputValidation";
import { validateReservationField } from "@utils/validateReservationField";
import SuccessMessage from "@components/ui/SuccessMessage";
import Title from "@components/ui/Title";

const AddReservation = () => {
  const [newReservation, setNewReservation] = useState({
    startTime: "",
    endTime: "",
    purpose: "",
    additionalDetails: "",
  });

  const [reservationErrors, setReservationErrors] = useState({
    startTime: "",
    endTime: "",
    purpose: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef();

  const hasErrors = Object.values(reservationErrors).some((error) => error);
  const hasEmptyFields =
    !newReservation.startTime ||
    !newReservation.endTime ||
    !newReservation.purpose;
  const isSubmitDisabled = hasErrors || hasEmptyFields;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));

    if (name === "startTime" || name === "endTime") {
      const error = validateReservationField(name, value, newReservation);
      setReservationErrors((prev) => ({ ...prev, [name]: error || "" }));
      return;
    }

    if (name === "purpose") {
      const error = validateField(name, value);
      setReservationErrors((prev) => ({ ...prev, purpose: error || "" }));
      return;
    }
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError("");

    try {
      setSuccessMessage("");
      const addedReservation = await addReservation(newReservation);
      setNewReservation({
        startTime: "",
        endTime: "",
        purpose: "",
        additionalDetails: "",
      });
      setSuccessMessage("Reservation created successfully.");
    } catch (error) {
      setAddError(error.message || "Failed to add reservation.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-base p-8">
      <Title className="text-center">Request a Company Vehicle</Title>
      {successMessage && <SuccessMessage message={successMessage} />}
      <form onSubmit={handleAddReservation} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInputField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={newReservation.startTime}
            onChange={handleInputChange}
            error={reservationErrors.startTime}
            ref={inputRef}
          />
          <FormInputField
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={newReservation.endTime}
            onChange={handleInputChange}
            error={reservationErrors.endTime}
          />
        </div>
        <FormInputField
          label="Purpose"
          name="purpose"
          placeholder="Specify the trip purpose (e.g. client meeting, airport transfer, delivery ...)"
          value={newReservation.purpose}
          onChange={handleInputChange}
          error={reservationErrors.purpose}
          maxlength={100}
        />
        <TextAreaField
          label="Vehicle preferences (Optional)"
          name="additionalDetails"
          rows={3}
          value={newReservation.additionalDetails}
          onChange={handleInputChange}
          placeholder="E.g., SUV, van, automatic ..."
          maxlength={150}
        />
        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            readyToSend={isAdding || isSubmitDisabled}
          >
            {isAdding ? "Adding..." : "Add Reservation"}
          </SubmitButton>
        </div>
        {addError && <p className="text-error text-sm mt-4">{addError}</p>}
      </form>
    </div>
  );
};

export default AddReservation;
