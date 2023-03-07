import * as actionTypes from "./actionTypes";

const onChangeRoleLandlord = () => {
    return {
        type: actionTypes.LANDLORD
    }
}

const onChangeRoleTenant = () => {
    return {
        type: actionTypes.TENANT
    }
}

export const changeRole = (role) => dispatch => {
    if(role == 1){
        dispatch(onChangeRoleTenant());
    } else {
        dispatch(onChangeRoleLandlord());
    }
}