import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    shiftsList: [],
    shiftsByClientList: [],
    shiftsRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ShiftsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHIFTS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.SHIFTS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                shiftsRecord: [],
            }
        case actionTypes.SHIFTS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                shiftsList: action.shiftsList,
                showUpdateForm: false,
                showViewPage: false,
                shiftsRecord: [],
            }
        case actionTypes.SHIFTS_BY_CLIENT_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                shiftsByClientList: action.shiftsByClientList,
            }
        case actionTypes.SHIFTS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                shiftsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.SHIFTS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_SHIFTS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_SHIFTS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                shiftsRecord: [],
            }
        default:
            return state;
    }
}

export default ShiftsReducer;