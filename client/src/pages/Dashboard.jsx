import useLogout from "@hooks/useLogout";
import { useAuthContext } from "@hooks/useAuthContext";

const DashBoard = () => {
    const { user } = useAuthContext();

    return(
        <div>
            <h1>Hello {user?.firstName}</h1>
            {console.log(user)}
        </div>
    )
}

export default DashBoard;