import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import type { DecodedToken } from "../utils/decodeToken";

const AdminProtectedRouteProvider = () => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/admin/auth" replace />;

    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.roleId !== 1) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminProtectedRouteProvider