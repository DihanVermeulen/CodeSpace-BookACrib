import { Outlet, useNavigate } from "react-router-dom";
import '../styles.css';
import logo from '../assets/images/logo.png';
import github from '../assets/icons/github.svg';
import { useEffect, useState } from "react";
import { getLastSession } from "../utils/functions";
import toast from 'react-hot-toast';

export const Home = () => {
    const [loggedInAs, setLoggedInAs] = useState(null);
    const navigate = useNavigate();

    // Checks if the session state is true 
    // If it is true then it sets loggedInAs ID
    useEffect(() => {
        navigate('/hotels');

        if (JSON.parse(localStorage.getItem('loggedInAs') as any)) {
            getLastSession(JSON.parse(localStorage.getItem('loggedInAs') as any))
                .then(data => {
                    if (data.payload[0].session_state) {
                        setLoggedInAs(JSON.parse(localStorage.getItem('loggedInAs') as any));
                    } else {
                        console.log(data.payload[0].session_state);
                        localStorage.removeItem('loggedInAs');
                        setLoggedInAs(null);
                    }
                });
        }
    }, [loggedInAs]);

    // Shows toast
    const showLogoutNotification = () => toast('Logged out');

    return (
        <div id="home-page">

            

            <header className="home-page--main-header">
                <img className="home-page--main-header--logo" src={logo}></img>
            </header>

            <nav className="home-page--horisontal-navigation">
                <ul>
                    <li onClick={() => navigate('hotels')}>Hotels</li>
                    {loggedInAs && <li onClick={() => navigate('Bookings')}>View Bookings</li>}
                    {loggedInAs && <li onClick={() => navigate('profile')}>My Profile</li>}
                    {loggedInAs && <li onClick={() => {
                        setLoggedInAs(null);
                        localStorage.removeItem('loggedInAs');
                        showLogoutNotification();
                    }}>Logout</li>}
                    {!loggedInAs && <li onClick={() => {
                        navigate('/login&register');
                    }}>Login</li>}
                </ul>
            </nav>

            <main className="home-page--main-section">
                <Outlet context={[loggedInAs]} />
            </main>

            <footer className="home-page--footer">
                <div className="flex-col align-center">
                    <img className="home-page--footer-logo" src={logo} />
                    <div>
                        <a href="https://github.com/DihanVermeulen" target='_blank'><img className="home-page--footer-icon" src={github} alt="logo" /></a>
                    </div>
                    <p>(+27) 93 767 5522</p>
                    <p>All rights Reserved</p>
                    <p>© 2022 BOOK A CRIB</p>
                </div>
            </footer>
        </div>
    )
}