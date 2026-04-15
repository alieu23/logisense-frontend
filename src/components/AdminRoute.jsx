import {Navigate} from "react-router-dom";

export default function AdminRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) 
        return <Navigate to="/login" />;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const groups = payload["cognito:groups"] || [];

        if(!groups.includes("admin")) {
            return <Navigate to="/" />;
        }   

    
    return children;
}