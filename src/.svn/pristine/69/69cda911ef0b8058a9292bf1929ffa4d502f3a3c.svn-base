import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    emailTemplatesList: [],
    emailTemplatesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const EmailTemplatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMAIL_TEMPLATES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.EMAIL_TEMPLATES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                emailTemplatesRecord: [],
            }    
        case actionTypes.EMAIL_TEMPLATES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                emailTemplatesList: action.emailTemplatesList,
                showUpdateForm: false,
                showViewPage: false,
                emailTemplatesRecord: [],
            }
        case actionTypes.EMAIL_TEMPLATES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                emailTemplatesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.EMAIL_TEMPLATES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_EMAIL_TEMPLATES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_EMAIL_TEMPLATES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                emailTemplatesRecord: [],
            }
        default:
            return state;
    }
}

export default EmailTemplatesReducer;