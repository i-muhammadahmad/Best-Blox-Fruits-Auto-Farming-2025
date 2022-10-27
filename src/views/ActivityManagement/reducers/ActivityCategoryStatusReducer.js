import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    activityCategoryStatusList: [],
    activityCategoryStatusParentList: [],
    activityCategoryStatusRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ActivityCategoryStatusReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.ACTIVITY_CATEGORY_STATUS_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.ACTIVITY_CATEGORY_STATUS_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          activityCategoryStatusRecord: [],
        }    
    case actionTypes.ACTIVITY_CATEGORY_STATUS_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activityCategoryStatusList: action.activityCategoryStatusList,
          showUpdateForm: false,
          showViewPage: false,
          activityCategoryStatusRecord: [],
        }
    case actionTypes.ACTIVITY_CATEGORY_STATUS_PARENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activityCategoryStatusParentsList: action.activityCategoryStatusParentsList
        }    
    case actionTypes.ACTIVITY_CATEGORY_STATUS_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            activityCategoryStatusRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.ACTIVITY_CATEGORY_STATUS_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_ACTIVITY_CATEGORY_STATUS_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_ACTIVITY_CATEGORY_STATUS_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            activityCategoryStatusRecord: [],
        }
    default:
        return state;
    }
}

export default ActivityCategoryStatusReducer;