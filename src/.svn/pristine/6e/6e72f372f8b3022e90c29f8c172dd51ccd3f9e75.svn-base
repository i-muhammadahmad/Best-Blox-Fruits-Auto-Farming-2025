import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    approvalProfilesList: [],
    approvalProfilesDropdownList: [],
    approvalProfilesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ApprovalProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPROVAL_PROFILES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.APPROVAL_PROFILES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                approvalProfilesRecord: [],
            }
        case actionTypes.APPROVAL_PROFILES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                approvalProfilesList: action.approvalProfilesList,
                showUpdateForm: false,
                showViewPage: false,
                approvalProfilesRecord: [],
            }
        case actionTypes.APPROVAL_PROFILES_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                approvalProfilesDropdownList: action.approvalProfilesDropdownList,
            }    
        case actionTypes.APPROVAL_PROFILES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                approvalProfilesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.APPROVAL_PROFILES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_APPROVAL_PROFILES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_APPROVAL_PROFILES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                approvalProfilesRecord: [],
            }
        default:
            return state;
    }
}

export default ApprovalProfilesReducer;