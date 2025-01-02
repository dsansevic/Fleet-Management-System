import useLogout from "@hooks/useLogout";
import { useAuthContext } from "@hooks/useAuthContext";

const DashBoard = () => {
    const logout = useLogout();
    const { user } = useAuthContext();

    return(
        <div>
            <h1>Hello {user?.firstName || "User"}</h1>

            <button onClick={() => logout() }>Logout</button>
        </div>
    )
}

export default DashBoard;