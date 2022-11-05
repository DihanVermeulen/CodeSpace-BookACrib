import { useNavigate } from "react-router-dom" ;

export const Home = () => {

    const navigate = useNavigate()

    return (
        <div id="home-page">
            <header className="home-page--main-header"></header>
            <nav className="home-page--vertical-navigation"></nav>
            <main className="home-page--main-section"></main>
            <footer className="home-page--footer"></footer>
        </div>
    )
}