import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    meetingNotesList: [],
    meetingNotesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    meeting_note_add_update_status: false,
}

const MeetingNotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MEETING_NOTES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.MEETING_NOTES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                meetingNotesList: action.meetingNotesList,
                showUpdateForm: false,
                showViewPage: false,
                meetingNotesRecord: [],
                meeting_note_add_update_status: false
            }
        case actionTypes.MEETING_NOTES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                meetingNotesRecord: [],
                meeting_note_add_update_status: false
            }     
        case actionTypes.MEETING_NOTE_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                showUpdateForm: false,
                showViewPage: false,
                redirect_to_list: true,
            } 
        case actionTypes.MEETING_NOTES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                meetingNotesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.MEETING_NOTES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_MEETING_NOTES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_MEETING_NOTES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                meetingNotesRecord: [],
            }
        case actionTypes.SHOW_MEETING_NOTES_ADD_FORM:
            return {
                ...state,
                redirect_to_list: false,
                showUpdateForm: true,
                showViewPage: false,
                validation_error: '',
                meetingNotesRecord: [],
            }
        default:
            return state;
    }
}

export default MeetingNotesReducer;