export const dialogConstants = {
    OPEN: 'DIALOG_OPEN',
    CLOSED: 'DIALOG_CLOSED',
    INPUT_CHANGE: 'INPUT_CHANGE',
};

const initialState = {
    open: false,
    beacon: {
        name: 'none',
        address: 'none'
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dialogConstants.OPEN:
            return {
                open: true,
                beacon: action.beacon
            }
        case dialogConstants.CLOSED:
            return {
                open: false
            }
            case dialogConstants.INPUT_CHANGE:
            let beacon = state.beacon;
            beacon[action.propName] = action.propValue;
            return {
                open: true,
                beacon: beacon
            }
        default:
            return state;
    }
}
