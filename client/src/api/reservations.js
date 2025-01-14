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

export const fetchActiveReservations = async () => {
    try {
        const response = await apiClient.get("/reservation/active");
        return response.data;
    } catch (error) {
        console.error("Error fetching active reservations:", error);
        throw error.response?.data || { message: "Failed to fetch active reservations." };
    }
};

export const fetchInactiveReservations = async () => {
    try {
        const response = await apiClient.get("/reservation/inactive");
        return response.data;
    } catch (error) {
        console.error("Error fetching past reservations:", error);
        throw error.response?.data || { message: "Failed to fetch past reservations." };
    }
};

export const fetchReservationById = async (id) => {
    try {
        const response = await apiClient.get(`/reservation/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reservation details:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to fetch reservation details." };
    }
};

export const updateReservation = async (id, reservationData) => {
    try {
        console.log("prije slanja: ", reservationData)
        const response = await apiClient.patch(`/reservation/${id}`, reservationData);
        return response.data;
    } catch (error) {
        console.error("Error updating reservation:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to update reservation." };
    }
};

export const updateReservationStatus = async (id, reservationData) => {
    try {
        const response = await apiClient.patch(`/reservation/${id}/status`, reservationData);
        return response.data;
    } catch (error) {
        console.error("Error updating reservation status:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to update reservation." };
    }
};

export const handleReapproval = async (id, data) => {
    try {
        const response = await apiClient.patch(`/reservation/${id}/reapproval`, data);
        return response.data;
    } catch (error) {
        console.error("Error handling reapproval:", error);
        throw error.response?.data || { message: "Failed to handle reapproval." };
    }
};
