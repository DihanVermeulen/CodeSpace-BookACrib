import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export const Bookings: React.FC = () => {
    const [allBookings, setAllBookings] = useState<any[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [previousBookings, setPreviousBookings] = useState<any[]>([]);

    useEffect(() => {
        const getBookings = async (id: string) => {

            const request: any = await api.get('/bookings', {
                params: {
                    user_id: id
                }
            })

            const data = request.data;

            return data;
        }

        getBookings(JSON.parse(localStorage.getItem('loggedInAs') as string)).then((data) => {
            // Sets all bookings
            setAllBookings(data);

            // Filters data to find upcoming bookings
            let upcomingBookings = data.filter(function(booking: any) {
                return new Date(booking.arrival_date) > new Date();
            });

            setUpcomingBookings(upcomingBookings);

            let previousBookings = data.filter(function(booking: any) {
                return new Date(booking.arrival_date) < new Date();
            });
            setPreviousBookings(previousBookings);

        });
    }, []);
    
    console.table('upcoming bookings: ', upcomingBookings);

    return (
        <section id="bookings" className="main-section--card text-start">
            <h2>Upcoming bookings</h2>
            <table border={1}>
                <tr>
                    <th>Hotel</th>
                    <th>Date Created</th>
                    <th>Check in</th>
                    <th>Check out</th>
                </tr>
                {upcomingBookings.map((booking, key) => {
                    return (
                        <tr key={key}>
                            <td>{booking.hotel_name}</td>
                            <td>{booking.created}</td>
                            <td>{booking.arrival_date}</td>
                            <td>{booking.departure_date}</td>
                        </tr>
                    )
                })}
            </table>
            <h2>Previous bookings</h2>
        </section>
    )
}