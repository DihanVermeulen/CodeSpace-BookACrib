import { useNavigate, useOutletContext } from 'react-router-dom';
import update from '../../assets/icons/update.svg';
import './Profile.css';
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import { getBookings, getProfile } from '../../utils/functions';

interface User {
    user_name: string,
    user_email: any
}

export const Profile: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [allBookings, setAllBookings] = useState<any[]>();
    const [previousBookings, setPreviousBookings] = useState<any[]>();
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>();
    const navigate = useNavigate();
    const [loggedInAs]: any = useOutletContext(); // Uses context from outlet in Home component

    useEffect(() => {
        // Checks is user is logged in 
        // redirects to home if not
        if (!loggedInAs) {
            navigate('/hotels');
        }

        getProfile(JSON.parse(localStorage.getItem('loggedInAs') as any)).then((data) => {
            setUser(data[0]);
        });

        getBookings(JSON.parse(localStorage.getItem('loggedInAs') as string))
            .then((data: any) => {
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
            })
    }, [])

    return (
        <section id='profile' className="main-section--card">
            <img className='update-button' src={update} alt="update" onClick={() => {
                navigate('/update-profile');
            }} />
            <h2>{user?.user_name}</h2>
            <h3>{user?.user_email}</h3>
            <div className='flex-row justify-center'>
                <div className='badge'>Upcoming bookings: {upcomingBookings?.length || 0}</div>
                <div className='badge'>Previous bookings: {previousBookings?.length || 0}</div>
                <div className='badge'>Total bookings: {allBookings?.length || 0}</div>
            </div>
        </section>
    )
}