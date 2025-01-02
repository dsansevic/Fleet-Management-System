import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';

const PrivateRoutes = () => {
    const { token } = useContext(AuthContext);
    return(
        token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes