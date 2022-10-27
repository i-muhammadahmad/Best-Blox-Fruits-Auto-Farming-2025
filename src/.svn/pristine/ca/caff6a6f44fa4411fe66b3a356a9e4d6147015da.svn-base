import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditReviewsList: [],
    auditReviewsRecord:[],
    auditLoggedActivitiesList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.AUDIT_REVIEW_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.AUDIT_REVIEW_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          auditReviewsList: action.auditReviewsList,
          showUpdateForm: false,
          showViewPage: false,
          auditReviewsRecord: [],
        }
    case actionTypes.ALL_AUDIT_ACTIVITIES_REPORT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          auditLoggedActivitiesList: action.report_data,
          showUpdateForm: false,
          showViewPage: false,
          auditReviewsRecord: [],
        }    
    case actionTypes.AUDIT_REVIEW_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            auditReviewsRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.AUDIT_REVIEW_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_AUDIT_REVIEW_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_AUDIT_REVIEW_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            auditReviewsRecord: [],
        }        
    default:
        return state;
    }
}

export default AuditReviewsReducer;