import { buildingService } from '../services/buildings.service';
import { buildingsConstants } from '../modules/buildings';
import { push } from 'react-router-redux';

export const buildingActions = {
    getAll,
    getSingle
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