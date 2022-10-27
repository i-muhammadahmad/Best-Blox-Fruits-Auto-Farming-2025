import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    rolesList: [],
    rolesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const RolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROLES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ROLES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                rolesRecord: [],
            }    
        case actionTypes.ROLES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                rolesList: action.rolesList,
                showUpdateForm: false,
                showViewPage: false,
                rolesRecord: [],
            }
        case actionTypes.ROLES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                rolesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.ROLES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_ROLES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_ROLES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                rolesRecord: [],
            }
        default:
            return state;
    }
}

export default RolesReducer;