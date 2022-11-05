import { useNavigate } from "react-router-dom";
import '../styles.css';
import logo from '../assets/images/logo.png';

export const Home = () => {

    const navigate = useNavigate()

    return (
        <div id="home-page">
            <header className="home-page--main-header">
                <picture>
                    <img className="home-page--main-header--logo" src={logo}></img>
                </picture>
            </header>
            <nav className="home-page--vertical-navigation">
                Logout
            </nav>
            <main className="home-page--main-section"></main>
            <footer className="home-page--footer">
                All Rights Reserved
            </footer>
        </div>
    )
}