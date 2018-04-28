import { baseUrl, authHeader } from '../helpers/auth-header';

export const buildingService = {
    getAll,
    getSingle
}

const endpoint = baseUrl + '/buildings';

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(endpoint, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}

function getSingle(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    
    return fetch(endpoint + '/' + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}