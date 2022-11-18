import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import './Bookings.css';
import { getBookings, deleteBooking } from '../../utils/functions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../utils/utils.css';
import { useNavigate } from "react-router-dom";

interface IHotels {
    hotel_name: string,

}

export const Bookings: React.FC = () => {
    const [allBookings, setAllBookings] = useState<any[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [previousBookings, setPreviousBookings] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBookings(JSON.parse(localStorage.getItem('loggedInAs') as string)).then((data) => {
            // Sets all bookings
            if (data && Array.isArray(data)) {
                setAllBookings(data);

                // Filters data to find upcoming bookings
                let upcomingBookings = data.filter(function (booking: any) {
                    return new Date(booking.arrival_date) > new Date();
                });

                upcomingBookings = upcomingBookings.map((booking: any) => {
                    const obj = Object.assign({}, booking);
                    obj['arrival_date'] = (booking.arrival_date).split(' ')[0];
                    obj['departure_date'] = (booking.departure_date).split(' ')[0];
                    return obj;
                })

                setUpcomingBookings(upcomingBookings);

                // Filters data to find previous bookings
                let previousBookings = data.filter(function (booking: any) {
                    return new Date(booking.arrival_date) < new Date();
                });

                previousBookings = previousBookings.map((booking: any) => {
                    const obj = Object.assign({}, booking);
                    obj['arrival_date'] = (booking.arrival_date).split(' ')[0];
                    obj['departure_date'] = (booking.departure_date).split(' ')[0];
                    return obj;
                })

                setPreviousBookings(previousBookings);
            }
        }
        );
    }, []);

    const handleDeleteBooking = (event: any) => {
        let id = event.target.parentNode.parentNode.id;
        console.log(id);

        deleteBooking(id)
            .then((res: any) => window.location.reload());
    }

    return (
        <section id="bookings" className="main-section--card text-start">
            <h2>Upcoming bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Date Created</th>
                        <th>Check in</th>
                        <th>Check out</th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingBookings.map((booking, key) => (
                        <tr id={booking.booking_id} key={key}>
                            <td>{booking.hotel_name}</td>
                            <td>{booking.created}</td>
                            <td>{booking.arrival_date}</td>
                            <td>{booking.departure_date}</td>
                            <td>
                                <button onClick={handleDeleteBooking}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Previous bookings</h2>

            <table>
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Date created</th>
                        <th>Check in</th>
                        <th>Check out</th>
                    </tr>
                </thead>
                <tbody>
                    {previousBookings.map((booking, key) => {
                        return (
                            <tr id={booking.booking_id} key={key}>
                                <td>{booking.hotel_name}</td>
                                <td>{booking.created}</td>
                                <td>{booking.arrival_date}</td>
                                <td>{booking.departure_date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}