export const beaconsConstants = {
    INDEX_SUCCESS: 'BEACONS_INDEX_SUCCESS',
    INDEX_FAILURE: 'BEACONS_INDEX_FAILURE',
    CREATE_SUCCESS: 'BEACONS_CREATE_SUCCESS',
    CREATE_FAILURE: 'BEACONS_CREATE_FAILURE',
    DELETE_SUCCESS: 'BEACONS_DELETE_SUCCESS',
    DELETE_FAILURE: 'BEACONS_DELETE_FAILURE',
    UPDATE_SUCCESS: 'BEACONS_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'BEACONS_UPDATE_FAILURE',
};

const initialState = {
    entities: []
}

let beacons = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case beaconsConstants.INDEX_SUCCESS:
            return {
                entities: action.beacons
            };
        case beaconsConstants.INDEX_FAILURE:
            return {
                entities: [],
                error: action.error
            };
        case beaconsConstants.CREATE_SUCCESS:
            beacons = state.entities;
            beacons.push(action.beacon);
            return {
                entities: beacons
            };
        case beaconsConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case beaconsConstants.UPDATE_SUCCESS:
            beacons = state.entities.map((beacon) => {
                if (beacon._id === action.beacon._id) {
                    beacon = action.beacon;
                }
                return beacon;
            });
            return {
                entities: beacons
            };
        case beaconsConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case beaconsConstants.DELETE_SUCCESS:
            beacons = state.entities.filter((beacon) => {
                return beacon._id !== action.beacon._id
            });
            return {
                entities: beacons
            };
        case beaconsConstants.DELETE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}
