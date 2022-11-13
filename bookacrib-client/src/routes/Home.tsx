import { Outlet, useNavigate } from "react-router-dom";
import '../styles.css';
import logo from '../assets/images/logo.png';
import { useEffect, useState } from "react";

export const Home = () => {
    const [loggedInAs, setLoggedInAs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/hotels');
        let loggedInAccount: any = localStorage.getItem('loggedInAs');
        setLoggedInAs(loggedInAccount);

        // Checks to see if user is logged in
        if (loggedInAccount != null) {
            console.log('logged in as: ', loggedInAs);
        }
        else {
            navigate('/login&register');
            console.log('not logged in', loggedInAs);
        }
    }, [loggedInAs]);

    return (
        <div id="home-page">
            <header className="home-page--main-header">
                <img className="home-page--main-header--logo" src={logo}></img>
            </header>
            <nav className="home-page--horisontal-navigation">
                <ul>
                    <li onClick={() => navigate('hotels')}>Hotels</li>
                    <li onClick={() => navigate('Bookings')}>My Bookings</li>
                    <li onClick={() => {
                        setLoggedInAs(null);
                        localStorage.removeItem('loggedInAs');
                        navigate('login&register');
                    }}>Logout</li>
                </ul>
            </nav>
            <main className="home-page--main-section">
                <Outlet context={[loggedInAs, setLoggedInAs]} />
            </main>
            <footer className="home-page--footer">
                All Rights Reserved
            </footer>
        </div>
    )
}