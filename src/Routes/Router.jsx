import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import ErrorSection from "../pages/Shared/ErrorSection/ErrorSection";
import CampDetails from "../pages/CampDetails/CampDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";
import DashBoard from "../Layout/DashBoard";
import PrivateRouter from "./PrivateRouter";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorSection />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "camp-details/:id",
        element: <CampDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "available-camps",
        element: <AvailableCamp />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <DashBoard />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
