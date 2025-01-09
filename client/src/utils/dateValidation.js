export const validateNotInPast = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);

    if (date < today) {
        return "Date cannot be in the past.";
    }

    return null;
};