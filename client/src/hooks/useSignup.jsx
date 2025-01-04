import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import apiClient from "@api/apiClient";

const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (firstName, lastName, email, password, userRoleProp) => {
        setIsLoading(true);

        try {
            const response = await apiClient.post("/user/signup", { firstName, lastName, email, password, role: userRoleProp });
      
            dispatch({ type: "LOGIN", payload: response.data.user });
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