import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    transcribeConfigList: [],
    transcribeConfigRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    is_ftp_verified: false
}

const TranscribeConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TRANSCRIBE_CONFIG_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
                is_ftp_verified: false,
            }
        case actionTypes.TRANSCRIBE_CONFIG_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                transcribeConfigRecord: [],
            }    
        case actionTypes.TRANSCRIBE_CONFIG_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                transcribeConfigList: action.transcribeConfigList,
                showUpdateForm: false,
                showViewPage: false,
                transcribeConfigRecord: [],
            }
        case actionTypes.SET_FTP_VERIFIED_TRUE:
            return {
                ...state,
                Loading: false,
                is_ftp_verified: true
            }    
        case actionTypes.TRANSCRIBE_CONFIG_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                transcribeConfigRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.TRANSCRIBE_CONFIG_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_TRANSCRIBE_CONFIG_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_TRANSCRIBE_CONFIG_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                transcribeConfigRecord: [],
            }
        default:
            return state;
    }
}

export default TranscribeConfigReducer;