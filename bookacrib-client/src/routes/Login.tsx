import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LoginCard } from "../components/LoginCard/LoginCard";
import { RegisterCard } from "../components/RegisterCard/RegisterCard";
import axios from "axios";

export const Login = () => {
    const [showLoginCard, setShowLoginCard] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    return (
        <div id="login-page">
            {showLoginCard && <LoginCard setState={setShowLoginCard} />}
            {!showLoginCard && <RegisterCard setState={setShowLoginCard} />}
        </div>
    )
}