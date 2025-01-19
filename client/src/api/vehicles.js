import { apiClient } from "./apiClient";

export const getVehicles = async (page, limit) => {
    try {
        const response = await apiClient.get(`/vehicle?page=${page}&limit=${limit}`);
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

export const getVehicleById = async (id) => {
    try {
        const response = await apiClient.get(`/vehicle/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unknown error occurred.";
        throw new Error(errorMessage); 
    }
};

export const updateVehicle = async (id, data) => {
    try {
        console.log(data)
        const response = await apiClient.patch(`/vehicle/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error.response?.data || { message: "Failed to update vehicle." };
    }
};