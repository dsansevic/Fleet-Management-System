import { useState, useEffect, useRef } from "react";
import SelectField from "@components/form/SelectField";
import TextAreaField from "@components/form/TextAreaField";
import SubmitButton from "@components/ui/SubmitButton";
import SuccessMessage from "@components/ui/SuccessMessage";
import { createDamageReport } from "@api/damageReports";
import { fetchLiveOrCompletedReservations } from "@api/reservations";

const DamageReport = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await fetchLiveOrCompletedReservations();
                setReservations(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchReservations();
    }, []);

    const handleSelect = (e) => {
        setSelectedReservation(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!selectedReservation || !description.trim()) {
            setError("Please select a reservation and provide a description of the issue.");
            return;
        }

        try {
            await createDamageReport(selectedReservation, description);
            setSuccessMessage("Damage report submitted successfully.");
            setSelectedReservation("");
            setDescription("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Report a Damage or Problem</h1>

            {successMessage && <SuccessMessage message={successMessage} />}

            <p className="text-gray-600 mb-6">
                You can only report problems associated with your active or completed reservations.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <SelectField
                    label="Reservation"
                    ref={inputRef}
                    name="reservation"
                    value={selectedReservation}
                    onChange={handleSelect}
                    placeholder="Select reservation"
                    options={reservations.map((res) => ({
                        value: res._id,
                        label: `${res.vehicle?.brand} ${res.vehicle?.model} (${new Date(
                            res.startTime
                        ).toLocaleString()} - ${new Date(res.endTime).toLocaleString()})`,
                    }))}
                />
                <TextAreaField
                    label="Description of the problem"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Provide a detailed description of the issue."
                    rows={5}
                />
                {error && <p className="text-error mb-4">{error}</p>}
                        
                <div className="flex justify-end">
                    <SubmitButton readyToSend={!description || !selectedReservation}>
                        Submit
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default DamageReport;