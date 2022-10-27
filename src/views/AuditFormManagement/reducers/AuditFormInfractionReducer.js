import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditFormInfractionList: [],
    auditFormInfractionByClientList: [],
    auditFormInfractionRecord:[],
    auditFormInfractionDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditFormInfractionReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.AUDIT_FORM_INFRACTION_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.AUDIT_FORM_INFRACTION_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          auditFormInfractionRecord: [],
        }    
    case actionTypes.AUDIT_FORM_INFRACTION_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          auditFormInfractionList: action.auditFormInfractionList,
          showUpdateForm: false,
          showViewPage: false,
          auditFormInfractionRecord: [],
        }
    case actionTypes.AUDIT_FORM_INFRACTION_DROPDOWN_SUCCESS:
        return {
          ...state, 
          Loading: false,
          auditFormInfractionDropdownList: action.auditFormInfractionDropdownList,
        }    
    case actionTypes.AUDIT_FORM_INFRACTION_BY_CLIENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          auditFormInfractionByClientList: action.auditFormInfractionByClientList
        }    
    case actionTypes.AUDIT_FORM_INFRACTION_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            auditFormInfractionRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.AUDIT_FORM_INFRACTION_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_AUDIT_FORM_INFRACTION_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_AUDIT_FORM_INFRACTION_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            auditFormInfractionRecord: [],
        }  
    default:
        return state;
    }
}

export default AuditFormInfractionReducer;