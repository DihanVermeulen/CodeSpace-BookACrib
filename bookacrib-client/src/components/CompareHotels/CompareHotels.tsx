import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { fetchSearchParams, scrollPageToTop } from '../../utils/utils';

interface IHotel {
    hotel_name: string,
    rate: number,
    rating: number,
    image: string
}

export const CompareHotels: React.FC = (): any => {
    const [searchParams] = useSearchParams();
    const [hotel, setHotel] = useState<IHotel>();
    const [allHotels, setAllHotels] = useState<any[]>([]);

    const navigate = useNavigate();

    // Sets hotel state to hotel specified in search params
    useEffect(() => {
        let hotelIndex: any = fetchSearchParams(searchParams, "hotel"); // Gets search paramaters
        api.get('/hotels')
            .then((response): any => {
                let selectedHotel = response.data[hotelIndex];
                setAllHotels(response.data);
                setHotel(selectedHotel);
            });
    }, [hotel])

    return (
        <section className="main-section--card">
            <p>Selected hotel: {hotel?.hotel_name}</p>
            <br />
            <form>
                <div className="main-section--card-form-group">
                    <label>Arrival Date</label>
                    <input name="arrivalDate" type="date" />
                </div>
                <div className="main-section--card-form-group">
                    <label>Departure Date</label>
                    <input name="departureDate" type="date" />
                </div>
                <input type="submit" value="Compare" />
            </form>
            <hr />
            <section className="main-section--card--hotel-section">
                {allHotels.map((hotel, key) => {
                    return (
                        <article key={key} className='main-section--card--hotel-card'>
                            <img src={hotel.image} alt="hotel"></img>
                            <div>{hotel.hotel_name}</div>
                            <div>hotel rating:{hotel.hotel_rating}</div>
                            <button onClick={() => {
                                navigate({
                                    pathname: '/compare-hotels',
                                    search: `?hotel=${key}`,
                                });
                                setHotel(allHotels[fetchSearchParams('hotel')]);
                                scrollPageToTop();
                                console.log(hotel);
                            }}>Book Now</button>
                        </article>
                    )
                })}
            </section>
        </section>
    )
}