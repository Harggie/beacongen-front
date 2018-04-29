export const buildingsConstants = {
    INDEX_SUCCESS: 'BUILDINGS_INDEX_SUCCESS',
    INDEX_FAILURE: 'BUILDINGS_INDEX_FAILURE',

    SINGLE_SUCCESS: 'BUILDINGS_SINGLE_SUCCESS',
    SINGLE_FAILURE: 'BUILDINGS_SINGLE_FAILURE',

    CREATE_SUCCESS: 'BUILDINGS_CREATE_SUCCESS',
    CREATE_FAILURE: 'BUILDINGS_CREATE_FAILURE',

    UPDATE_SUCCESS: 'BUILDINGS_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'BUILDINGS_UPDATE_FAILURE',

    DELETE_SUCCESS: 'BUILDINGS_DELETE_SUCCESS',
    DELETE_FAILURE: 'BUILDINGS_DELETE_FAILURE'
};

const initialState = {
    entities: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case buildingsConstants.INDEX_SUCCESS:
            return {
                entities: action.buildings
            };
        case buildingsConstants.INDEX_FAILURE:
            return {
                entities: [],
                error: action.error
            };
        case buildingsConstants.SINGLE_SUCCESS:
            return {
                entity: action.building
            };
        case buildingsConstants.SINGLE_FAILURE:
            return {
                entity: null,
                error: action.error
            };
        case buildingsConstants.CREATE_SUCCESS:
            return {
                entity: action.building
            };
        case buildingsConstants.CREATE_FAILURE:
            return {
                entity: null,
                error: action.error
            };
        case buildingsConstants.UPDATE_SUCCESS:
            return {
                entity: action.building
            };
        case buildingsConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case buildingsConstants.DELETE_SUCCESS:
            let buildings = state.entities.filter((building) => {
                return building._id !== action.building._id
            });
            return {
                entities: buildings
            };
        case buildingsConstants.DELETE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}