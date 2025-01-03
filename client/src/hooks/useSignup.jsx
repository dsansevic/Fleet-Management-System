import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import apiClient from "@api/apiClient";

const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (firstName, lastName, email, password, userRoleProp) => {
        setIsLoading(true);

        try {
            await apiClient.post("/user/signup", { firstName, lastName, email, password, role: userRoleProp });
            const response = await apiClient.get("/user/verify-session"); 
      
            dispatch({ type: "LOGIN", payload: response.data }); 
            setIsLoading(false);
            return true;
              
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            
            return false;
          }
      }

    return { signup, isLoading }; 
}

export default useSignup;