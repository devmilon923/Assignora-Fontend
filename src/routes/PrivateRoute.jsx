import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../services/useAuth";

export default function PrivateRoute({ children }) {
  const location = useLocation();

  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );

  if (user?.uid) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
}
