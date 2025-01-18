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
import MyCamp from "../pages/Dashboard/MyCamp";
import Analytics from "../pages/Dashboard/Analytics";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import Profile from "../pages/Dashboard/Profile";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AddCamp from "../pages/Dashboard/Admin/AddCamp";
import ManageCamp from "../pages/Dashboard/Admin/ManageCamp";
import RegisterCamp from "../pages/Dashboard/Admin/RegisterCamp";
import AdminRouter from "./AdminRouter";
import UpdateCamp from "../pages/Dashboard/Admin/UpdateCamp";
import Payment from "../components/Payment";
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
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "my-camp",
        element: <MyCamp />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: 'payment',
        element: <Payment />
      },

      // Admin here

      {
        path: "admin-profile",
        element: (
          <AdminRouter>
            <AdminProfile />
          </AdminRouter>
        ),
      },
      {
        path: "add-camp",
        element: (
          <AdminRouter>
            <AddCamp />
          </AdminRouter>
        ),
      },
      {
        path: "manage-camp",
        element: (
          <AdminRouter>
            <ManageCamp />
          </AdminRouter>
        ),
      },
      {
        path: "register-camp",
        element: (
          <AdminRouter>
            {" "}
            <RegisterCamp />
          </AdminRouter>
        ),
      },
      {
        path: "updateCamp/:id",
        element: (
          <AdminRouter>
            {" "}
            <UpdateCamp />
          </AdminRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.id}`),
      },
    ],
  },
]);
