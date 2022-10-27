import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    assetApprovalsList: [],
    assetApprovalsRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    asset_approval_add_update_status: false,
}

const AssetApprovalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ASSET_APPROVALS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ASSET_APPROVALS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                assetApprovalsList: action.assetApprovalsList,
                showUpdateForm: false,
                showViewPage: false,
                assetApprovalsRecord: [],
                asset_approval_add_update_status: false
            }
        case actionTypes.ASSET_APPROVALS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                assetApprovalsRecord: [],
                asset_approval_add_update_status: false
            }     
        case actionTypes.ASSET_APPROVAL_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                showUpdateForm: false,
                showViewPage: false,
                redirect_to_list: true,
            } 
        case actionTypes.ASSET_APPROVALS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                assetApprovalsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.ASSET_APPROVALS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_ASSET_APPROVALS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_ASSET_APPROVALS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                assetApprovalsRecord: [],
            }
        case actionTypes.SHOW_ASSET_APPROVALS_ADD_FORM:
            return {
                ...state,
                redirect_to_list: false,
                showUpdateForm: true,
                showViewPage: false,
                validation_error: '',
                assetApprovalsRecord: [],
            }
        default:
            return state;
    }
}

export default AssetApprovalsReducer;