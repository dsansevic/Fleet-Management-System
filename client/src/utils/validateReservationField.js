import { validateNotInPast } from "@utils/dateValidation";

export const validateReservationField = (name, value, reservationData) => {
    if (name === "startTime") {
        const now = new Date();
        const startTime = new Date(value);

        if (startTime.getTime() - now.getTime() < 30 * 60 * 1000) {
            return "Start time must be at least 30 minutes in the future.";
        }

        const errorInPast = validateNotInPast(value);
        if (errorInPast) {
            return errorInPast;
        }

        const endTime = reservationData.endTime ? new Date(reservationData.endTime) : null;
        if (endTime && startTime >= endTime) {
            return "Start time must be before the end time.";
        }
    }

    if (name === "endTime") {
        const endTime = new Date(value);
        const startTime = new Date(reservationData.startTime);

        if (reservationData.startTime && endTime <= startTime) {
            return "End time must be after start time.";
        }

        const errorInPast = validateNotInPast(value);
        if (errorInPast) {
            return errorInPast;
        }
    }

    if (name === "purpose" && !value.trim()) {
        return "Purpose in required";
    }

    return "";
};