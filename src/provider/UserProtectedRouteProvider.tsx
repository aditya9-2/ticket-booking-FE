import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import type { DecodedToken } from "../utils/decodeToken";

const UserProtectedRouteProvider = () => {
    const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" replace />;

  const decoded = jwtDecode<DecodedToken>(token);

  if (decoded.roleId !== 2) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}

export default UserProtectedRouteProvider