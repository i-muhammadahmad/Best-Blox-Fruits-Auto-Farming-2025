import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditFormList: [],
    auditFormRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUDIT_FORM_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.AUDIT_FORM_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                auditFormRecord: [],
            }    
        case actionTypes.AUDIT_FORM_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormList: action.auditFormList,
                showUpdateForm: false,
                showViewPage: false,
                auditFormRecord: [],
            }
        case actionTypes.AUDIT_FORM_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                auditFormRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.AUDIT_FORM_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_AUDIT_FORM_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_AUDIT_FORM_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                auditFormRecord: [],
            }
        default:
            return state;
    }
}

export default AuditFormReducer;