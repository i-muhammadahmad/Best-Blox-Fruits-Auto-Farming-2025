import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    transcribeJobList: [],
    transcribeJobRecord: [],
    transcribeJobDetailRecord: [],
    redirect_to_list: false,
    showViewPage: false,
    showJobDetailsViewModel: false,
    job_detail_audio_file_path: ''
}

const TranscribeJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TRANSCRIBE_JOB_REQUEST:
            return {
                ...state,
                Loading: true,
                redirect_to_list: false,
            }
        case actionTypes.TRANSCRIBE_JOB_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                showViewPage: false,
                transcribeJobRecord: [],
                transcribeJobDetailRecord: [],
                showJobDetailsViewModel: false
            }     
        case actionTypes.TRANSCRIBE_JOB_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                transcribeJobList: action.transcribeJobList,
                showViewPage: false,
                transcribeJobRecord: [],
                transcribeJobDetailRecord: [],
                showJobDetailsViewModel: false
            }   
        case actionTypes.TRANSCRIBE_JOB_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                transcribeJobRecord: action.record,
                showViewPage: (action.actionType === 'view') ? true : false,
                transcribeJobDetailRecord: [],
                showJobDetailsViewModel: false,
            }
        case actionTypes.REDIRECT_TO_TRANSCRIBE_JOB_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showViewPage: false,
                validation_error: '',
                transcribeJobRecord: [],
                transcribeJobDetailRecord: [],
                showJobDetailsViewModel: false,
                job_detail_audio_file_path: ''
            }
        case actionTypes.TOGGLE_TRANSCRIBE_JOB_VIEW_MODAL: 
            return {
                ...state,
                transcribeJobDetailRecord: action.jobDetailRecord,
                showJobDetailsViewModel: !state.showJobDetailsViewModel,
            }
        case actionTypes.SET_TRANSCRIBE_JOB_DETAIL_AUDIO_FILE_PATH:
            return {
                ...state,
                job_detail_audio_file_path :action.audio_file_path
            }    
        default:
            return state;
    }
}

export default TranscribeJobReducer;