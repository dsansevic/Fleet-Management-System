import { apiClient } from "./apiClient";

export const getVehicles = async () => {
    try {
        const response = await apiClient.get("/vehicle");
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unknown error occurred.";
        throw new Error(errorMessage); 
    }
};

export const addVehicles = async (data) => {
    try {
        const response = await apiClient.post("/vehicle", data);
        return response.data.vehicle;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to add vehicle.";
        throw new Error(errorMessage);
    }
};

export const updateVehicle = async (id, data) => {
    try {
        const response = await apiClient.patch(`/vehicle/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error.response?.data || { message: "Failed to update vehicle." };
    }
};