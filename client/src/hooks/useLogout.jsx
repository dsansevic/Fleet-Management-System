import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        sessionStorage.removeItem("token");
    
        dispatch({ type: 'LOGOUT' })

        navigate("/login");
      }

    return logout; 
}

export default useLogout;