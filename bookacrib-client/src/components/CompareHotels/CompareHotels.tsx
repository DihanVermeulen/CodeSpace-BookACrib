import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { calculateNumDays, createBooking, fetchSearchParams, scrollPageToTop, showNotification } from '../../utils/functions';
import 'reactjs-popup/dist/index.css';
import './CompareHotels.css';

interface IHotel {
    hotel_id: number,
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
        const getHotels = async () => {
            const request: any = await api.get('/hotels');

            const data = request.data;

            return data;
        }
        getHotels()
            .then((res: any) => {
                console.log(res);
                setAllHotels(res);
                setHotel(res[hotelIndex]);
            });
    }, [searchParams])

    useEffect(() => {
        let hotelIndex: any = fetchSearchParams(searchParams, "hotel"); // Gets search paramaters
        setHotel(allHotels[hotelIndex]);

    }, [searchParams, hotel])


    const handleCompareSubmit = (event: any) => {
        event.preventDefault();
        let arrivalDate = new Date((document.querySelector('#arrivalDate') as HTMLInputElement).value);
        let departureDate = new Date((document.querySelector('#departureDate') as HTMLInputElement).value);

        let numberOfDays = calculateNumDays(departureDate, arrivalDate);
        setTotalDays(numberOfDays);
        if (!isNaN(numberOfDays)) {
            (document.querySelector('.totalRate') as HTMLElement).style.display = 'block';
        }
    }

    const handleCreateBookingSubmit = () => {
        if ((document.querySelector('#arrivalDate') as HTMLInputElement).value && (document.querySelector('#departureDate') as HTMLInputElement).value) {
            // Creates a booking
            createBooking(hotel?.hotel_id, JSON.parse(localStorage.getItem('loggedInAs') as any), new Date((document.querySelector('#arrivalDate') as HTMLInputElement).value),
                new Date((document.querySelector('#departureDate') as HTMLInputElement).value), (hotel?.hotel_name as string));
            // Makes error message invisible
            (document.querySelector('.error') as HTMLElement).style.display = 'none';
            showNotification("Created booking!");
            navigate('/bookings');
            window.location.reload();
        }
        else {
            // Makes error message visible
            (document.querySelector('.error') as HTMLElement).style.display = 'block';
        }
    }

    return (
        <section className="main-section--card">
            <p>Selected hotel: {hotel?.hotel_name}</p>
            <p>Rates p/d: R{hotel?.hotel_rate}</p>
            <p className="totalRate">Total Cost: R{totalDays * (hotel?.hotel_rate)}</p>
            <br />
            <form onSubmit={handleCompareSubmit}>
                <div className="flex-row justify-center">
                    <div className="main-section--card-form-group margin-5">
                        <label>Arrival Date</label>
                        <input id="arrivalDate" name="arrivalDate" type="date" />
                    </div>
                    <div className="main-section--card-form-group margin-5">
                        <label>Departure Date</label>
                        <input id="departureDate" name="departureDate" type="date" />
                    </div>
                </div>
                <div className="error">Please enter dates</div>
                <input className="primary-button" type="submit" value="Compare" />
            </form>
            <button className="primary-button" onClick={handleCreateBookingSubmit}>Make Booking</button>

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