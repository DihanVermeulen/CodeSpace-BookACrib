import { api } from "../api/axios";

/**
 * Fetches all parameters in search and return as an array
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

// Function to log user in
export const login = (id: string) => {
    api.post('/login', JSON.stringify({
        user_update: 1,
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

// Function to register user
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