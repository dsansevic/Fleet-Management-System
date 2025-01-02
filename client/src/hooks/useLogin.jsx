import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (email, password, rememberMe) => {
        setIsLoading(true);

        try {
            const userInfo = {
                email,
                password
            }

            const response = await axios.post('http://localhost:3000/user/login', userInfo);
            const {user, token, userRole} = response.data;

            dispatch({
              type: 'LOGIN',
              payload: { userRole, token, userRole },
            });
        
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('token', token);

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