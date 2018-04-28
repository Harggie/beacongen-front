import { userService } from '../services/users.service';
import { loginConstants } from '../modules/login';
import { push } from 'react-router-redux';

export const userActions = {
    login,
    logout,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(push('/'));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: loginConstants.LOGOUT };
}