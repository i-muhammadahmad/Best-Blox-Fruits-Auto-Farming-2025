import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    settingsList: [],
    settingsRecord: [],
    settingsGeneral: [],
    settingsHREmail: [],
    settingsITEmail: [],
    settingsITNotification: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETTINGS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }  
        case actionTypes.SETTINGS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                settingsList: action.settingsList,
                showUpdateForm: false,
                showViewPage: false,
                settingsRecord: [],
            } 
        case actionTypes.SETTINGS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                settingsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.GENERAL_SETTINGS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                settingsGeneral: action.settingsGeneral,
            }
        case actionTypes.HR_EMAIL_SETTINGS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                settingsHREmail: action.settingsHREmail,
            }    
        case actionTypes.IT_EMAIL_SETTINGS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                settingsITEmail: action.settingsITEmail,
            }
        case actionTypes.IT_NOTIFICATION_SETTINGS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                settingsITNotification: action.settingsITNotification,
            }
        case actionTypes.SETTINGS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_SETTINGS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        default:
            return state;
    }
}

export default SettingsReducer;