import { dialogConstants } from '../modules/dialog';


export const dialogActions = {
    open,
    close,
    inputChange
};

function open(beacon) {
    console.log(beacon);
    return dispatch => {
        dispatch({type: dialogConstants.OPEN, beacon: beacon});
    }
}

function close() {
    return dispatch => {
        dispatch({type: dialogConstants.CLOSED});
    }
}

function inputChange(name, value) {
    return dispatch => {
        dispatch({type: dialogConstants.INPUT_CHANGE, propName: name, propValue: value});
    }
}

