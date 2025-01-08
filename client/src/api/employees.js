import { apiClient } from "./apiClient";

export const getEmployees = async () => {
    try {
        const response = await apiClient.get("/user/employees");
        console.log(response)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An unknown error occurred.";
        throw new Error(errorMessage); 
    }
};

export const addEmployee = async (data) => {
    try {
        const response = await apiClient.post("/user/employees", data);
        console.log(response.data)
        return response.data.user;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to add employee.";
        throw new Error(errorMessage);
    }
};

export const updateEmployee = async (id, data) => {
    return apiClient.put(`/employees/${id}`, data);
};

export const deleteEmployee = async (id) => {
    return apiClient.delete(`/employees/${id}`);
};