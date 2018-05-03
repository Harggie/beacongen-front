import { areasConstants } from '../modules/areas';


export const areasActions = {
    create
};

function create(area) {
    return dispatch => {
        dispatch({type: areasConstants.CREATE, area});
    }
}
