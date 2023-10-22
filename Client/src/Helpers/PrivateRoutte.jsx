import { Navigate, Outlet } from 'react-router-dom'
 
let auth=localStorage.getItem('authToken')

const PrivateRoutes = () => {
return (
    auth ? <Outlet/> : <Navigate to="/"/>
  )
}

export default PrivateRoutes