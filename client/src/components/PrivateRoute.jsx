import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
export default function PrivateRoute() {
  const {currentUser}=useSelector((state) => state.user)
  //if the user is logged in then only profile is visible to him (profile is children here )else naviagte to sign in page

  return currentUser? <Outlet/>: <Navigate to='/sign-in'/>
    
  
}
