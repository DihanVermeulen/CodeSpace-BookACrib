import { api } from "../api/axios";

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
export const getLastSession = (id: string): any => {
    api.get('/session', {
        params: {
            userId: id
        }
    })
        .then(res => console.log(res));
}

/**
 * Calculates days between two dates
 * Requires dates as arguments
 * First date must be the later date
 * @param date1 
 * @param date2 
 */
export const calculateNumDays = (date1: Date, date2: Date) => {
    let totalDaysBetweenDates = Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    console.log('total days between: ', totalDaysBetweenDates);
    return totalDaysBetweenDates;
}