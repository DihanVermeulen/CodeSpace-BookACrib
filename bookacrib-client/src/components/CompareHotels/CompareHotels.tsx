import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { calculateNumDays, fetchSearchParams, scrollPageToTop } from '../../utils/utils';
import './CompareHotels.css';

interface IHotel {
    hotel_name: string,
    hotel_rate: any,
    hotel_rating: number,
    image: string
}

export const CompareHotels: React.FC = (): any => {
    const [searchParams] = useSearchParams();
    const [hotel, setHotel] = useState<IHotel>();
    const [allHotels, setAllHotels] = useState<any[]>([]);
    const [totalDays, setTotalDays] = useState<any>(0);

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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let arrivalDate = new Date((document.querySelector('#arrivalDate') as HTMLInputElement).value);
        let departureDate = new Date((document.querySelector('#departureDate') as HTMLInputElement).value);

        let numberOfDays = calculateNumDays(departureDate, arrivalDate);
        setTotalDays(numberOfDays);
        if(!isNaN(numberOfDays)) {
            (document.querySelector('.totalRate') as HTMLElement).style.display = 'block';
        }
    }

    return (
        <section className="main-section--card">
            <p>Selected hotel: {hotel?.hotel_name}</p>
            <p>Rates p/d: R{hotel?.hotel_rate}</p>
            <p className="totalRate">Total Cost: R{totalDays * (hotel?.hotel_rate)}</p>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="main-section--card-form-group">
                    <label>Arrival Date</label>
                    <input id="arrivalDate" name="arrivalDate" type="date" />
                </div>
                <div className="main-section--card-form-group">
                    <label>Departure Date</label>
                    <input id="departureDate" name="departureDate" type="date" />
                </div>
                <input className="primary-button" type="submit" value="Compare" />
            </form>
            <button className="primary-button">Make Booking</button>

            <hr />

            <section className="main-section--card--hotel-section">
                {allHotels.map((hotel, key) => {
                    return (
                        <article key={key} className='main-section--card--hotel-card'>
                            <img src={hotel.image} alt="hotel"></img>
                            <div>{hotel.hotel_name}</div>
                            <div>Hotel rating:{hotel.hotel_rating}</div>
                            <div>Rates p/d: R{hotel.hotel_rate}</div>
                            <p>Total Cost: R{totalDays * hotel.hotel_rate}</p>
                            <button className="primary-button" onClick={() => {
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