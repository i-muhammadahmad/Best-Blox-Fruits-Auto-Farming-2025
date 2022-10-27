import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    contactBoardList: [],
    contactBoardRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ContactBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONTACT_BOARD_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.CONTACT_BOARD_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                contactBoardRecord: [],
            }    
        case actionTypes.CONTACT_BOARD_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                contactBoardList: action.contactBoardList,
                showUpdateForm: false,
                showViewPage: false,
                contactBoardRecord: [],
            }
        case actionTypes.CONTACT_BOARD_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                contactBoardRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.CONTACT_BOARD_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_CONTACT_BOARD_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_CONTACT_BOARD_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                contactBoardRecord: [],
            }
        default:
            return state;
    }
}

export default ContactBoardReducer;