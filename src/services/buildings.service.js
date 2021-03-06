import { baseUrl, authHeader } from '../helpers/auth-header';

export const buildingService = {
    getAll,
    getSingle,
    createNew,
    update,
    remove
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

function createNew(data) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {'content-type': 'application/json'}),
        body: JSON.stringify(data)
    };

    return fetch(endpoint, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}

function update(id, data) {
    const requestOptions = {
        method: 'PATCH',
        headers: Object.assign(authHeader(), {'content-type': 'application/json'}),
        body: JSON.stringify(data)
    };

    return fetch(endpoint + '/' + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}

function remove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(endpoint + '/' + id, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}