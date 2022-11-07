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
                <h3>Compare hotels and book your stay</h3>
                {hotels.map((hotel, key) => {
                    return (
                        <div key={key} className='main-section--card--hotel-card'>
                            <img src={hotel.image} alt="hotel"></img>
                            <div>{hotel.hotel_name}</div>
                            <div>{hotel.rating}</div>
                        </div>
                    )
                })}
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