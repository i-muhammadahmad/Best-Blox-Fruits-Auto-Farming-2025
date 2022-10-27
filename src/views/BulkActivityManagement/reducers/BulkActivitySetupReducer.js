import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    bulkActivitySetupList: [],
    bulkActivitySetupRecord: [],
    clientsList: [],
    availableExtraFields: [],
    addedExtraFields: [],
    removedExtraFields: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const BulkActivitySetupReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.BULK_ACTIVITY_SETUP_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.BULK_ACTIVITY_SETUP_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          bulkActivitySetupRecord: [],
          availableExtraFields: [],
          addedExtraFields: [],
          removedExtraFields: [],
        }    
    case actionTypes.BULK_ACTIVITY_SETUP_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          bulkActivitySetupList: action.bulkActivitySetupList,
          showUpdateForm: false,
          showViewPage: false,
          bulkActivitySetupRecord: [],
          availableExtraFields: [],
          addedExtraFields: [],
          removedExtraFields: [],
        }
    case actionTypes.BULK_EXTRA_FIELDS_SUCCESS:   
        return {
            ...state,
            Loading: false,
            availableExtraFields: action.extraFields,
            addedExtraFields: [],
        }    
    case actionTypes.BULK_ACTIVITY_SETUP_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            bulkActivitySetupRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false,
            availableExtraFields: [],
            addedExtraFields: [],
        }    
    case actionTypes.BULK_ACTIVITY_SETUP_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_BULK_ACTIVITY_SETUP_FIELD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.field_key])
            delete state.validation_error[action.field_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_BULK_ACTIVITY_SETUP_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            bulkActivitySetupRecord: [],
        }  
    case actionTypes.ADD_REMOVE_BULK_EXTRA_FIELD:
        return {
            ...state,
            availableExtraFields: action.a_fields,
            addedExtraFields: action.added_fields,
            removedExtraFields: action.removed_fields,
        }    
    default:
        return state;
    }
}

export default BulkActivitySetupReducer;