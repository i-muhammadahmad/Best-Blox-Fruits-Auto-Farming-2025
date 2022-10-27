import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    shiftBreaksList: [],
    shiftBreaksRecord: [],
    breakTypesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ShiftBreaksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHIFT_BREAKS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.SHIFT_BREAKS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                shiftBreaksRecord: [],
            }    
        case actionTypes.SHIFT_BREAKS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                shiftBreaksList: action.shiftBreaksList,
                showUpdateForm: false,
                showViewPage: false,
                shiftBreaksRecord: [],
            }
        case actionTypes.BREAK_TYPES_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                breakTypesDropdownList: action.breakTypesDropdownList,
            }
        case actionTypes.SHIFT_BREAKS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                shiftBreaksRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.SHIFT_BREAKS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_SHIFT_BREAKS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_SHIFT_BREAKS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                shiftBreaksRecord: [],
            }
        default:
            return state;
    }
}

export default ShiftBreaksReducer;