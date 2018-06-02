import { baseUrl, authHeader } from '../helpers/auth-header';

export const floorService = {
    getAll,
    getSingle,
    createNew,
    update,
    remove,
    upload,
    points,
}

const endpoint = baseUrl + '/floors';

function getAll(buildingId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(endpoint + '/building/' + buildingId, requestOptions)
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
        headers: Object.assign(authHeader(), { 'content-type': 'application/json' }),
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
        headers: Object.assign(authHeader(), { 'content-type': 'application/json' }),
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

function upload(id, file) {

    let form = new FormData();
    form.append('file', file);

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: form
    };

    return fetch(endpoint + '/' + id + '/upload', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}

function points(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(endpoint + '/' + id + '/points', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        });
}