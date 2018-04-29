import { baseUrl } from '../helpers/auth-header';

export const userService = {
    login,
    logout
}

const endpoint = baseUrl + '/users';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(endpoint + '/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}