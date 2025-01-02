import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";

const useSignup = () => {

    const {dispatch} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (firstName, lastName, email, password, role) => {
        setIsLoading(true);

        try {
            const userInfo = {
                firstName,
                lastName,
                email,
                password,
                role
            };

            const response = await axios.post('http://localhost:3000/user/signup', userInfo);
            const {user, token, userRole} = response.data;
            
            dispatch({
              type: 'LOGIN',
              payload: { user, token, userRole },
            });
        
            localStorage.setItem('token', token);
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