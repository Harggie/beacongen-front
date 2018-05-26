import { beaconService } from '../services/beacons.service';
import { beaconsConstants } from '../modules/beacons';


export const beaconsActions = {
    getAll,
    createNew,
    update,
    remove
};

function create(beacon) {
    return dispatch => {
        dispatch({type: beaconsConstants.CREATE, beacon});
    }
}

function getAll(floorId) {
    return dispatch => {
        beaconService.getAll(floorId)
            .then(
                beacons => {
                    dispatch(success(beacons));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(beacons) { return { type: beaconsConstants.INDEX_SUCCESS, beacons } }
    function failure(error) { return { type: beaconsConstants.INDEX_FAILURE, error } }
}

function createNew(data) {
    return dispatch => {
        beaconService.createNew(data)
            .then(
                beacon => {
                    dispatch(success(beacon));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(beacon) { return { type: beaconsConstants.CREATE_SUCCESS, beacon } }
    function failure(error) { return { type: beaconsConstants.CREATE_FAILURE, error } }
}

function update(id, data) {
    return dispatch => {
        beaconService.update(id, data)
            .then(
                beacon => {
                    dispatch(success(beacon));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(beacon) { return { type: beaconsConstants.UPDATE_SUCCESS, beacon } }
    function failure(error) { return { type: beaconsConstants.UPDATE_FAILURE, error } }
}

function remove(id) {
    return dispatch => {
        beaconService.remove(id)
            .then(
                beacon => {
                    dispatch(success(beacon));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(beacon) { return { type: beaconsConstants.DELETE_SUCCESS, beacon } }
    function failure(error) { return { type: beaconsConstants.DELETE_FAILURE, error } }
}
