import { buildingService } from '../services/buildings.service';
import { buildingsConstants } from '../modules/buildings';
import { push } from 'react-router-redux';

export const buildingActions = {
    getAll,
    getSingle,
    createNew,
    update,
    remove
};

function getAll() {
    return dispatch => {
        buildingService.getAll()
            .then(
                buildings => {
                    dispatch(success(buildings));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(buildings) { return { type: buildingsConstants.INDEX_SUCCESS, buildings } }
    function failure(error) { return { type: buildingsConstants.INDEX_FAILURE, error } }
}

function getSingle(id) {
    return dispatch => {
        buildingService.getSingle(id)
            .then(
                building => {
                    dispatch(success(building));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(building) { return { type: buildingsConstants.SINGLE_SUCCESS, building } }
    function failure(error) { return { type: buildingsConstants.SINGLE_FAILURE, error } }
}

function createNew(data) {
    return dispatch => {
        buildingService.createNew(data)
            .then(
                building => {
                    dispatch(success(building));
                    dispatch(push('/buildings'));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(building) { return { type: buildingsConstants.CREATE_SUCCESS, building } }
    function failure(error) { return { type: buildingsConstants.CREATE_FAILURE, error } }
}

function update(id, data) {
    return dispatch => {
        buildingService.update(id, data)
            .then(
                building => {
                    dispatch(success(building));
                    dispatch(push('/buildings'));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(building) { return { type: buildingsConstants.UPDATE_SUCCESS, building } }
    function failure(error) { return { type: buildingsConstants.UPDATE_FAILURE, error } }
}

function remove(id) {
    return dispatch => {
        buildingService.remove(id)
            .then(
                building => {
                    dispatch(success(building));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(building) { return { type: buildingsConstants.DELETE_SUCCESS, building } }
    function failure(error) { return { type: buildingsConstants.DELETE_FAILURE, error } }
}