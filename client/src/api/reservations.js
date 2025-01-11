import { apiClient } from "./apiClient";

export const addReservation = async (reservationData) => {
    try {
        const response = await apiClient.post("/reservation", reservationData);
        return response.data.reservation;
    } catch (error) {
        console.error("Error adding reservation:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to add reservation." };
    }
};