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
            setAllBookings(data);
        });
    });

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
                <tr>
                    <td>The silo</td>
                    <td>2022-09-23</td>
                    <td>2022-09-24</td>
                    <td>2022-09-25</td>
                </tr>
            </table>
            <h2>Previous bookings</h2>
        </section>
    )
}