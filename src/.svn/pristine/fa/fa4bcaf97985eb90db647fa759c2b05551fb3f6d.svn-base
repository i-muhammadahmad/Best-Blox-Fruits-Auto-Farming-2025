import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    activityLogList: [],
    activityLogRecord: [],
    clientsList: [],
    statusesByCategoryId: [],
    myLoggedActivitiesReport: [],
    allLoggedActivitiesReport: [],
    myLoggedActivitiesSummaryReport: [],
    allLoggedActivitiesSummaryReport: [],
    usersList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ActivityLogReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.ACTIVITY_LOG_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.ACTIVITY_LOG_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activityLogList: action.activityLogList,
          showUpdateForm: false,
          showViewPage: false,
          activityLogRecord: [],
          statusesByCategoryId: [],
        }
    case actionTypes.ACTIVITY_LOG_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          activityLogRecord: [],
          statusesByCategoryId: [],
        }    
    case actionTypes.ACTIVITY_STATUSES_LOG_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          statusesByCategoryId: action.statusesByCategoryId,
        }    
       
    case actionTypes.ACTIVITY_LOG_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            activityLogRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false,
            statusesByCategoryId: [],
        }    
    case actionTypes.ACTIVITY_LOG_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_ACTIVITY_LOG_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_ACTIVITY_LOG_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            activityLogRecord: [],
            statusesByCategoryId: [],
        }
    case actionTypes.MY_ACTIVITIES_REPORT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          myLoggedActivitiesReport: action.report_data,
        }  
    case actionTypes.ALL_ACTIVITIES_REPORT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          allLoggedActivitiesReport: action.report_data,
        }        
    case actionTypes.USERS_LOG_SUCCESS:
        return {
          ...state, 
          Loading: false,
          usersList: action.usersList,
        } 
    case actionTypes.MY_ACTIVITIES_SUMMARY_REPORT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          myLoggedActivitiesSummaryReport: action.report_data,
        }  
    case actionTypes.ALL_ACTIVITIES_SUMMARY_REPORT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          allLoggedActivitiesSummaryReport: action.report_data,
        }          

    default:
        return state;
    }
}

export default ActivityLogReducer;