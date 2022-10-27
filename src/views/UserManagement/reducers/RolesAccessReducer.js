import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    permissionsListByRole: [],
    isPermissonsFetched: false,
    rolesAccessRecord: [],
    validation_error: "",
    redirect_to_list: false,
}

const RolesAccessReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROLES_ACCESS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ROLES_ACCESS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                permissionsListByRole: action.permissionsListByRole,
                isPermissonsFetched: true,
                rolesAccessRecord: [],
            }
        case actionTypes.SET_PERMISSIONS_FETCHED_FALSE:
            return {
                ...state,
                isPermissonsFetched: false,
            }    
        case actionTypes.ROLES_ACCESS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                rolesAccessRecord: action.record,
            }
        case actionTypes.ROLES_ACCESS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_ROLES_ACCESS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_ROLES_ACCESS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                validation_error: '',
                rolesAccessRecord: [],
                permissionsListByRole: []
            }
        default:
            return state;
    }
}

export default RolesAccessReducer;