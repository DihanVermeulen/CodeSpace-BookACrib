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