import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "@api/apiClient";

const useLogout = () => {
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    const logout = async () => {
      try {
        await apiClient.post("/user/logout");
        dispatch({ type: "LOGOUT" }); 

        navigate("/login");
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    }
    return logout; 
}

export default useLogout;