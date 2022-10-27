import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    activitySetupList: [],
    activitySetupByRoleList: [],
    activitySetupRecord: [],
    clientsList: [],
    availableExtraFeilds: [],
    addedExtraFeilds: [],
    activitySetupByAttrList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ActivitySetupReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.ACTIVITY_SETUP_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.ACTIVITY_SETUP_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          activitySetupRecord: [],
          availableExtraFeilds: [],
          addedExtraFeilds: [],
        }    
    case actionTypes.ACTIVITY_SETUP_BY_ROLE_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            validation_error: "",
            showUpdateForm: false,
            showViewPage: false,
            activitySetupRecord: [],
            availableExtraFeilds: [],
            addedExtraFeilds: [],
            activitySetupByRoleList: action.activitySetupByRoleList,
        }
    case actionTypes.ACTIVITY_SETUP_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          activitySetupList: action.activitySetupList,
          showUpdateForm: false,
          showViewPage: false,
          activitySetupRecord: [],
          availableExtraFeilds: [],
          addedExtraFeilds: [],
        }
    case actionTypes.ACTIVITY_SETUP_BY_ATTR_SUCCESS:
        return {
          ...state, 
          Loading: false,
          activitySetupByAttrList: action.activitySetupByAttrList,
        }    
    case actionTypes.EXTRA_FIELDS_SUCCESS:   
        return {
            ...state,
            Loading: false,
            availableExtraFeilds: action.extraFeilds,
            addedExtraFeilds: [],
        }    
    case actionTypes.ACTIVITY_SETUP_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            activitySetupRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false,
            availableExtraFeilds: [],
            addedExtraFeilds: [],
        }    
    case actionTypes.ACTIVITY_SETUP_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_ACTIVITY_SETUP_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_ACTIVITY_SETUP_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            activitySetupRecord: [],
        }
    case actionTypes.ADD_REMOVE_EXTRA_FEILD:
        return {
            ...state,
            availableExtraFeilds: action.a_feilds,
            addedExtraFeilds: action.added_feilds,
        }    
    default:
        return state;
    }
}

export default ActivitySetupReducer;