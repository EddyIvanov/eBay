import fetchUrl from '../../utils/fetchUrl';

export async function fetchBooks<IBooksAPI>(type: string) {

    return await fetchUrl(`https://www.googleapis.com/books/v1/volumes?q=${type}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    });

}
