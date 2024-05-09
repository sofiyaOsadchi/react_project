import { Navigate } from "react-router-dom";
import { FCC } from "../@types/types";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRouteBusiness: FCC = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token");
    const { user } = useAuth();

    if (!isLoggedIn || !user?.isBusiness) {
        return <Navigate to={"/"} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRouteBusiness;
