import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    errorSeverityList: [],
    errorSeverityRecord:[],
    auditErrorSeveritiesByClientList:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditErrorSeverityReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.ERROR_SEVERITY_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.ERROR_SEVERITY_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          errorSeverityList: action.errorSeverityList,
          showUpdateForm: false,
          showViewPage: false,
          errorSeverityRecord: [],
        }
    case actionTypes.ERROR_SEVERITY_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            errorSeverityRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.ERROR_SEVERITY_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_ERROR_SEVERITY_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_ERROR_SEVERITY_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            errorSeverityRecord: [],
        }        
    case actionTypes.AUDIT_ERROR_SEVERITIES_BY_CLIENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          auditErrorSeveritiesByClientList : action.auditErrorSeveritiesList
        }    
    default:
        return state;
    }
}

export default AuditErrorSeverityReducer;