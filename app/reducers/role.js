import * as actionTypes from "@actions/actionTypes";
const initialState = {
    role: 1
};

export default (state = initialState, action = {}) => {
    console.log('state', state, 'action', action)
    switch (action.type) {
        case actionTypes.TENANT:
            return {
                role: 1
            };
        case actionTypes.LANDLORD:
            return {            
                role: 2
            };
        default:
            return state;
    }
};