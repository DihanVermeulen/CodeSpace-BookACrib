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
            <section className="home-page--main-section--card">
                <h3>Compare hotels and book your stay</h3>
                <div>
                    {hotels.map((hotel, key) => {
                        return (
                        <div key={key} className='home-page--main-section--card--hotel-card'>
                            <div>{hotel.hotel_name}</div>                          
                            <div>{hotel.rating}</div>                          
                        </div>
                    )})}
                </div>
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