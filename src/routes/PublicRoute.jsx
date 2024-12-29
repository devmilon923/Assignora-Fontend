import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="w-full  flex items-center justify-center">
        <img className="w-12" src="/loader.gif" alt="" />
      </div>
    );
  if (!user?.uid) {
    return children;
  }

  if (location.state) {
    return <Navigate to={location.state}></Navigate>;
  } else {
    return <Navigate to={"/assignments"}></Navigate>;
  }
}
