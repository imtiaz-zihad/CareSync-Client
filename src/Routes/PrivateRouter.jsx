/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";


const PrivateRouter = ({children,loading}) => {
    const {user}= useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner />
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRouter;