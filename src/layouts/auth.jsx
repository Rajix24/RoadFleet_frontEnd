import { Outlet, useNavigate , redirect} from "react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";

const ROLE_HOME = {
    admin: "/admin",
    chauffeur: "/chauffeur",
};

function getUser() {
    try {
        const raw = Cookies.get("user");

        if (!raw) return null;

        return JSON.parse(raw);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default function AuthLayout() {
    const navigate = useNavigate();
    const user = getUser();

    console.log("AuthLayout rendered");

    useEffect(() => {
        if (user !== null) {
            console.log("Navigating to:", ROLE_HOME[user.role]);
            navigate(ROLE_HOME[user.role]);
        }
    }, []);

    return <Outlet />;
}