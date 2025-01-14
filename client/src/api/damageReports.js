import { apiClient } from "./apiClient";

export const createDamageReport = async (reservationId, description) => {
    try {
        const response = await apiClient.post("/damage-report", {
            reservationId,
            description,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating damage report:", error);
        throw new Error("Failed to create damage report.");
    }
};