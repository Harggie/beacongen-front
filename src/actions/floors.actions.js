import { floorService } from '../services/floors.service';
import { floorsConstants } from '../modules/floors';
import { push } from 'react-router-redux';

export const floorActions = {
    getAll,
    getSingle,
    createNew,
    update,
    remove,
    upload,
    getPoints
};

function getAll(buildingId) {
    return dispatch => {
        floorService.getAll(buildingId)
            .then(
                floors => {
                    dispatch(success(floors));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floors) { return { type: floorsConstants.INDEX_SUCCESS, floors } }
    function failure(error) { return { type: floorsConstants.INDEX_FAILURE, error } }
}

function getSingle(id) {
    return dispatch => {
        floorService.getSingle(id)
            .then(
                floor => {
                    dispatch(success(floor));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floor) { return { type: floorsConstants.SINGLE_SUCCESS, floor } }
    function failure(error) { return { type: floorsConstants.SINGLE_FAILURE, error } }
}

function createNew(data) {
    return dispatch => {
        floorService.createNew(data)
            .then(
                floor => {
                    dispatch(success(floor));
                    dispatch(push('/buildings/building/' + floor.building_id));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floor) { return { type: floorsConstants.CREATE_SUCCESS, floor } }
    function failure(error) { return { type: floorsConstants.CREATE_FAILURE, error } }
}

function update(id, data) {
    return dispatch => {
        floorService.update(id, data)
            .then(
                floor => {
                    dispatch(success(floor));
                    dispatch(push('/buildings/building/' + floor.building_id ));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floor) { return { type: floorsConstants.UPDATE_SUCCESS, floor } }
    function failure(error) { return { type: floorsConstants.UPDATE_FAILURE, error } }
}

function remove(id) {
    return dispatch => {
        floorService.remove(id)
            .then(
                floor => {
                    dispatch(success(floor));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floor) { return { type: floorsConstants.DELETE_SUCCESS, floor } }
    function failure(error) { return { type: floorsConstants.DELETE_FAILURE, error } }
}

function upload(id, file) {
    return dispatch => {
        floorService.upload(id, file)
            .then(
                floor => {
                    dispatch(success(floor));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(floor) { return { type: floorsConstants.UPLOAD_SUCCESS, floor } }
    function failure(error) { return { type: floorsConstants.UPLOAD_FAILURE, error } }
}

function getPoints(id) {
    return dispatch => {
        floorService.points(id)
            .then(
                points => {
                    dispatch(success(points));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(points) { return { type: floorsConstants.POINTS_SUCCESS, points } }
    function failure(error) { return { type: floorsConstants.POINTS_FAILURE, error } }
}