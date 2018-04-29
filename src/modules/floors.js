export const floorsConstants = {
    INDEX_SUCCESS: 'FLOORS_INDEX_SUCCESS',
    INDEX_FAILURE: 'FLOORS_INDEX_FAILURE',

    SINGLE_SUCCESS: 'FLOORS_SINGLE_SUCCESS',
    SINGLE_FAILURE: 'FLOORS_SINGLE_FAILURE',

    CREATE_SUCCESS: 'FLOORS_CREATE_SUCCESS',
    CREATE_FAILURE: 'FLOORS_CREATE_FAILURE',

    UPDATE_SUCCESS: 'FLOORS_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'FLOORS_UPDATE_FAILURE',

    DELETE_SUCCESS: 'FLOORS_DELETE_SUCCESS',
    DELETE_FAILURE: 'FLOORS_DELETE_FAILURE',

    UPLOAD_SUCCESS: 'FLOORS_UPLOAD_SUCCESS',
    UPLOAD_FAILURE: 'FLOORS_UPLOAD_FAILURE'
};

const initialState = {
    entities: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case floorsConstants.INDEX_SUCCESS:
            return {
                entities: action.floors
            };
        case floorsConstants.INDEX_FAILURE:
            return {
                entities: [],
                error: action.error
            };
        case floorsConstants.SINGLE_SUCCESS:
            return {
                entity: action.floor
            };
        case floorsConstants.SINGLE_FAILURE:
            return {
                entity: null,
                error: action.error
            };
        case floorsConstants.CREATE_SUCCESS:
            return {
                entity: action.floor
            };
        case floorsConstants.CREATE_FAILURE:
            return {
                entity: null,
                error: action.error
            };
        case floorsConstants.UPDATE_SUCCESS:
            return {
                entity: action.floor
            };
        case floorsConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case floorsConstants.DELETE_SUCCESS:
            let floors = state.entities.filter((floor) => {
                return floor._id !== action.floor._id
            });
            return {
                entities: floors
            };
        case floorsConstants.DELETE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case floorsConstants.UPLOAD_SUCCESS:
            return {
                entity: action.floor
            };
        case floorsConstants.UPLOAD_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}