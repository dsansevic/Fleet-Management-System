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

export const getDamageReport = async () => {
    try {
        const response = await apiClient.get("/damage-report")
        return response.data;
    } catch (error) {
        console.error("Error creating damage report:", error);
        throw new Error("Failed to create damage report.");
    }
};

export const fetchDamageReportById = async (id) => {
    try {
        const response = await apiClient.get(`/damage-report/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching damage report details:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch damage report details.");
    }
};

export const updateDamageReportStatus = async (id, data) => {
    try {
        const response = await apiClient.patch(`/damage-report/${id}/status`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating damage report status:", error);
        throw error.response?.data || { message: "Failed to update damage report status." };
    }
};