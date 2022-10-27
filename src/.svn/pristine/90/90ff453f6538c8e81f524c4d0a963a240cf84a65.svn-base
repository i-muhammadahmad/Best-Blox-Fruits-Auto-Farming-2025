import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditErrorCategoryList: [],
    auditErrorCategoryByClientList: [],
    auditErrorCategoryRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditErrorCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.AUDIT_ERROR_CATEGORY_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.AUDIT_ERROR_CATEGORY_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          auditErrorCategoryRecord: [],
        }    
    case actionTypes.AUDIT_ERROR_CATEGORY_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          auditErrorCategoryList: action.auditErrorCategoryList,
          showUpdateForm: false,
          showViewPage: false,
          auditErrorCategoryRecord: [],
        }
    case actionTypes.AUDIT_ERROR_CATEGORY_BY_CLIENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          auditErrorCategoryByClientList: action.auditErrorCategoryByClientList
        }    
    case actionTypes.AUDIT_ERROR_CATEGORY_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            auditErrorCategoryRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.AUDIT_ERROR_CATEGORY_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_AUDIT_ERROR_CATEGORY_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_AUDIT_ERROR_CATEGORY_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            auditErrorCategoryRecord: [],
        }  
    default:
        return state;
    }
}

export default AuditErrorCategoryReducer;