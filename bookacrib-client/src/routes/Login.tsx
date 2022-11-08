import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
      navigate('login');
    }, [])
    

    return (
        <div id="login-page">
            <Outlet />
        </div>
    )
}