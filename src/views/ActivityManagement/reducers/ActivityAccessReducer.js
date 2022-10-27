import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    activityAccessList: [],
    activityAccessRolesList: [],
    activityAccessRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ActivityAccessReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.ACTIVITY_ACCESS_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.ACTIVITY_ACCESS_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          activityAccessRecord: [],
        }    
    case actionTypes.ACTIVITY_ACCESS_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activityAccessList: action.activityAccessList,
          showUpdateForm: false,
          showViewPage: false,
          activityAccessRecord: [],
        }
    case actionTypes.ACTIVITY_ACCESS_ROLE_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activityAccessRolesList: action.activityAccessRolesList
        }    
    case actionTypes.ACTIVITY_ACCESS_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            activityAccessRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.ACTIVITY_ACCESS_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_ACTIVITY_ACCESS_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_ACTIVITY_ACCESS_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            activityAccessRecord: [],
        }
    default:
        return state;
    }
}

export default ActivityAccessReducer;