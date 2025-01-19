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

export const getDamageReport = async (page, limit, status = "") => {
    try {
        let url = `/damage-report?page=${page}&limit=${limit}`;
        
        if (status && status !== "all") {
            url += `&status=${status}`;
        }
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error creating damage report:", error);
        throw new Error("Failed to get damage reports.");
    }
};

export const getDamageReportById = async (id) => {
    try {
        const response = await apiClient.get(`/damage-report/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching damage report details:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch damage report details.");
    }
};

export const getUserDamageReport = async (page, limit) => {
    try {
        const response = await apiClient.get(`/damage-report/user?page=${page}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Failed to fetch user's damage report.");
    }
};

export const updateDamageReportStatus = async (id, adminMessage) => {
    try {
        const response = await apiClient.patch(`/damage-report/${id}/status`, adminMessage);
        return response.data;
    } catch (error) {
        console.error("Error updating damage report status:", error);
        throw error.response?.data || { message: "Failed to update damage report status." };
    }
};