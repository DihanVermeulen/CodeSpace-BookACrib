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

export const login = () => {
    api.post('/login', JSON.stringify({
        user_update: 1,
        user_id: "C#32b31047bf68aefa8bb491d46a432e8c"
    }),
        {
            headers: {
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
}