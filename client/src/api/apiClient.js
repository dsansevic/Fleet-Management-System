import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export const publicApiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false,
});