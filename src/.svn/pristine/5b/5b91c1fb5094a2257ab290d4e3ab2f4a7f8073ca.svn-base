import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    leaveTypeList: [],
    leaveTypeRecord: [],
    leaveTypeDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const leaveTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LEAVE_TYPE_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.LEAVE_TYPE_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                leaveTypeRecord: [],
            }
        case actionTypes.LEAVE_TYPE_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                leaveTypeDropdownList: action.leaveTypeDropdownList,
            }
        case actionTypes.LEAVE_TYPE_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                leaveTypeList: action.leaveTypeList,
                showUpdateForm: false,
                showViewPage: false,
                leaveTypeRecord: [],
            }
        case actionTypes.LEAVE_TYPE_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                leaveTypeRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.LEAVE_TYPE_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_LEAVE_TYPE_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_LEAVE_TYPE_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                leaveTypeRecord: [],
            }
        default:
            return state;
    }
}

export default leaveTypeReducer;