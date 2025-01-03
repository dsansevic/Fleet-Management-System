import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import apiClient from "@api/apiClient";

const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (email, password ) => {
        setIsLoading(true);

        try {
            const response = await apiClient.post("/user/login", { email, password });
            dispatch({ type: "LOGIN", payload: response.data.user });
            setIsLoading(false); 
            return true;
            
        } catch (e) {
            setError(e.response?.data?.message || "Invalid credentials");
            setIsLoading(false);

            return false;
          }
      }

    return {login, isLoading, error}; 
}

export default useLogin;