import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { JsxElement } from "typescript";
import { api } from "../../axios";

export const Hotels = () => {
    const [hotels, setHotels] = useState<any[]>([]);

    useEffect(() => {
        api.get('/hotels')
            .then((response): any => setHotels(response.data));
    }, [])

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
                            <div>{hotel.rating}</div>
                        </article>
                    )
                })}
                </section>
            </section>
        )
    }
    else {
        return (
            <section className="home-page--main-section--card">
                <h3>Compare hotels and book your stay</h3>
                loading...
            </section>
        )
    }
}