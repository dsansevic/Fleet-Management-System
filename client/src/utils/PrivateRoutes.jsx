import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoutes = () => {
    let isAuthorised = {'token':false}
    return(
        isAuthorised.token ? <Outlet/> : <Navigate to="../pages/login"/>
    )
}

export default PrivateRoutes