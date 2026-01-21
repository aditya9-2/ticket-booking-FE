import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteProvider = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" replace />
    }
    return <Outlet />

}

export default ProtectedRouteProvider