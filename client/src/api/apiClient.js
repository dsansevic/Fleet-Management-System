import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
});

export const publicApiClient = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:3000",
    withCredentials: false,
});