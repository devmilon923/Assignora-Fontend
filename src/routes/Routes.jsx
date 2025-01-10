import { createBrowserRouter } from "react-router-dom";
import Create from "../components/auth/Create";
import Login from "../components/auth/Login";

import Main from "../layouts/Main";
import Home from "../pages/Home";

import AssignmentDetails from "../components/AssignmentDetails";
import Setting from "../components/auth/Setting";
import UserProfile from "../components/auth/UserProfile";
import GiveMarks from "../components/GiveMarks";
import ResetPassword from "../components/ResetPassword";
import Assignments from "../pages/Assignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAttempted from "../pages/MyAttempted";
import NotFound404 from "../pages/NotFound404";
import PendingAssignment from "../pages/PendingAssignment";
import UpdateAssignment from "../pages/UpdateAssignment";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/assignments-pending",
        element: (
          <PrivateRoute>
            <PendingAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments",
        element: <Assignments />,
      },
      {
        path: "/assignments-details/:id",
        element: (
          <PrivateRoute>
            <AssignmentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments-create",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments-update/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-attempted",
        element: (
          <PrivateRoute>
            <MyAttempted />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/setting",
        element: (
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        ),
      },
      {
        path: "/marks/:id",
        element: (
          <PrivateRoute>
            <GiveMarks />
          </PrivateRoute>
        ),
      },
      {
        path: "/check",
        element: <div>Hello</div>,
      },
      {
        path: "/auth/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/auth/create",
        element: (
          <PublicRoute>
            <Create />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
