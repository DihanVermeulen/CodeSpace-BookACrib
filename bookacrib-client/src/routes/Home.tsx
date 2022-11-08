import { Outlet, useNavigate } from "react-router-dom";
import '../styles.css';
import logo from '../assets/images/logo.png';
import { useEffect, useState } from "react";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('hotels');
    }, []);

    return (
        <div id="home-page">
            <header className="home-page--main-header">
                    <img className="home-page--main-header--logo" src={logo}></img>
            </header>
            <nav className="home-page--vertical-navigation">
                <ul>
                    <li onClick={() => navigate('login&register')}>Logout</li>
                </ul>
            </nav>
            <main className="home-page--main-section">
                <Outlet />
            </main>
            <footer className="home-page--footer">
                All Rights Reserved
            </footer>
        </div>
    )
}