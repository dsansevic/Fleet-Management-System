import { useState, useEffect, useRef } from "react";
import FormInputField from "@components/form/FormInputField";
import TextAreaField from "@components/form/TextAreaField";
import SubmitButton from "@components/ui/SubmitButton";
import { addReservation } from "@api/reservations";
import { validateField } from "@utils/inputValidation";
import { validateNotInPast } from "@utils/dateValidation";

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
    const inputRef = useRef();

    const hasErrors = Object.values(reservationErrors).some((error) => error);
    const hasEmptyFields =
        !newReservation.startTime || !newReservation.endTime || !newReservation.purpose;
    const isSubmitDisabled = hasErrors || hasEmptyFields;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation((prev) => ({ ...prev, [name]: value }));

        if (name === "startTime" || name === "endTime") {
            const errorInPast = validateNotInPast(value);

            if (errorInPast) {
                setReservationErrors((prev) => ({
                    ...prev,
                    [name]: errorInPast,
                }));
                return;
            }

            if (name === "endTime" && newReservation.startTime) {
                const startDate = new Date(newReservation.startTime);
                const endDate = new Date(value);

                if (endDate <= startDate) {
                    setReservationErrors((prev) => ({
                        ...prev,
                        endTime: "End time must be after start time.",
                    }));
                    return;
                }
            }
        }

        const error = validateField(name, value);
        setReservationErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleAddReservation = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        setAddError("");

        try {
            const addedReservation = await addReservation(newReservation);
            setNewReservation({
                startTime: "",
                endTime: "",
                purpose: "",
                additionalDetails: "",
            });
        } catch (error) {
            setAddError(error.message || "Failed to add reservation.");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Reservation</h2>
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
                    placeholder="Enter the purpose of the reservation"
                    value={newReservation.purpose}
                    onChange={handleInputChange}
                    error={reservationErrors.purpose}
                />
                <TextAreaField
                    label="Additional Details (Optional)"
                    name="additionalDetails"
                    value={newReservation.additionalDetails}
                    onChange={handleInputChange}
                    placeholder="Add any additional details about your reservation"
                />
                <div className="flex justify-end">
                    <SubmitButton
                        readyToSend={isAdding || isSubmitDisabled}
                        className="w-full sm:w-auto bg-brand-base text-white font-semibold py-2 px-6 rounded-lg shadow"
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