import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios";

export const Hotels = () => {
    const [hotels, setHotels] = useState<any[]>();

    /**
     * Fetches hotel data through get request and sets hotels state
     */
    useEffect(() => {
        api.get('/hotels')
            .then((response): any => setHotels(response.data))
            .catch((err) => console.log(err));
    }, [])

    const navigate = useNavigate(); // Uses react dom navigation

    if (hotels) {
        return (
            <section className="main-section--card">
                <h2>Compare hotels and book your stay</h2>
                <section className="main-section--card--hotel-section">
                    {hotels.map((hotel, key) => {
                        return (
                            <article key={key} className='main-section--card--hotel-card'>
                                <img src={hotel.image} alt="hotel"></img>
                                <div>{hotel.hotel_name}</div>
                                <div>hotel rating:{hotel.rating}</div>
                                <button onClick={() => {
                                    navigate({
                                        pathname: 'compare-hotels',
                                        search: `?hotel=${key}`,
                                    });
                                }}>Book Now</button>
                            </article>
                        )
                    })}
                </section>
            </section>
        )
    }
    else {
        return (
            <section className="main-section--card">
                <h3>Compare hotels and book your stay</h3>
                <section className="main-section--card--hotel-section">
                    loading...
                </section>
            </section>
        )
    }
}