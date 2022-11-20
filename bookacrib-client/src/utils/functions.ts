import { api } from "../api/axios";
import { Booking } from "../model/Booking";
import toast from 'react-hot-toast';

/**
 * Fetches all parameters in search and returns as an array
 * @param args All parameters that will be fetched
 * @returns 
 */
export const fetchSearchParams = (searchParams: any, ...args: string[]): any => {
    let response: any[] = [];
    for (let arg of args) {
        response.push(searchParams.get(arg));
    }
    return response;
}

/**
 * Scrolls page to top
 */
export const scrollPageToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

/**
 * Logs user in
 * @param id 
 * @param updateState 
 */
export const login = (id: string, updateState: number) => {
    api.post('/login', JSON.stringify({
        user_update: updateState,
        user_id: id,
    }),
        {
            headers: {
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'application/json'
            }
        })
        .catch((err) => console.log(err));
}

/**
 * Registers user to database
 * @param data 
 */
export const register = (data: any) => {
    api.post('/register', data, {
        headers: {
            'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
            'Content-Type': 'application/json'
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

/**
 * Gets last session of user
 * @param id 
 */
export const getLastSession = async (id: string) => {
    const request: any = await api.get('/session', {
        params: {
            userId: id
        }
    })

    const data = await request.data;

    return {
        payload: data
    }
}

/**
 * Calculates days between two dates
 * Requires dates as arguments
 * @param date1 Must be later date
 * @param date2 Must be earlier date
 */
export const calculateNumDays = (date1: Date, date2: Date) => {
    let totalDaysBetweenDates = Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    console.log('total days between: ', totalDaysBetweenDates);
    return totalDaysBetweenDates;
}

/**
 * Creates a booking
 * @param hotelId 
 * @param userId 
 * @param arrivalDate 
 * @param departureDate 
 */
export const createBooking = (hotelId: any, userId: any, arrivalDate: any, departureDate: any, hotelName: string) => {
    let booking = new Booking(hotelId, userId, arrivalDate, departureDate, hotelName);

    console.log(booking.getBooking());

    let data = JSON.stringify(booking.getBooking());

    api.post('/booking', data, {
        headers: {
            'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
            'Content-Type': 'application/json'
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

/**
 * Gets all bookings from user
 * @param id 
 * @returns 
 */
export const getBookings = async (id: string) => {
    const request: any = await api.get('/bookings', {
        params: {
            user_id: id
        }
    })

    const data = await request.data;

    return data;
}

/**
 * Gets user profile
 * @param id 
 * @returns 
 */
export const getProfile = async (id: string) => {

    const request: any = await api.get('/find-user', {
        params: {
            user_id: id
        }
    })

    const data = request.data;

    return data;
}

export const deleteProfile = (id: string) => {
    api.delete(`/delete-user`,
        {
            data: {
                userId: id
            }
        })
        .then((res: any) => console.log(res));
}

export const deleteBooking = async (id: any) => {
    const request: any = await api.delete('/delete-booking', {
        data: {
            bookingId: id
        }
    });

    return request
}

export const showNotification = (message: any) => {
    toast(message);
}