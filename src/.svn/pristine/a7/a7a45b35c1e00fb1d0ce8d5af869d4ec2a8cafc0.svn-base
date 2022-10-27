import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditFormSetupList: [],
    auditFormSetupRecord: [],
    auditFormSetupDropdownList: [],
    auditFormSetupCheckpointsList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditFormSetupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUDIT_FORM_SETUP_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.AUDIT_FORM_SETUP_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                auditFormSetupRecord: [],
            }    
        case actionTypes.AUDIT_FORM_SETUP_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormSetupList: action.auditFormSetupList,
                showUpdateForm: false,
                showViewPage: false,
                auditFormSetupRecord: [],
            }
        case actionTypes.AUDIT_FORM_SETUP_DROPDOWN_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormSetupDropdownList: action.auditFormSetupDropdownList,
            }  
        case actionTypes.AUDIT_FORM_SETUP_CHECKPOINT_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormSetupCheckpointsList: action.auditFormSetupCheckpointsList,
            }        
        case actionTypes.AUDIT_FORM_SETUP_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                auditFormSetupRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.AUDIT_FORM_SETUP_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_AUDIT_FORM_SETUP_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_AUDIT_FORM_SETUP_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                auditFormSetupRecord: [],
            }
        default:
            return state;
    }
}

export default AuditFormSetupReducer;