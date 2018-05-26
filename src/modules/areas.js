export const areasConstants = {
    CREATE: 'AREAS_CREATE',
    DELETE: 'AREAS_DELETE',
    RENAME: 'AREAS_RENAME',
    SAVE_SUCCESS: 'AREAS_SAVE_SUCCESS',
    SAVE_FAILURE: 'AREAS_SAVE_FAILURE',
};

const initialState = {
    entities: []
}

//let areas = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case areasConstants.CREATE:
            let areas = state.entities;
            areas.push(action.area);
            return {
                entities: areas
            };
        case areasConstants.DELETE:
            break;
            // areas = state.entities.filter((area) => {
            //     return area.id !== action.area.id
            // });
            // return {
            //     entities: areas
            // };
        case areasConstants.RENAME:
            break;
            // areas = state.entities.map((area) => {
            //     if (area.id === action.area.id) {
            //         area = action.area;
            //     }
            // });
            // return {
            //     entities: areas
            // };
        default:
            return state;
    }
}
