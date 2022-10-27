import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    leaveScheduleList: [],
    leaveScheduleRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const LeaveScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LEAVE_SCHEDULE_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.LEAVE_SCHEDULE_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                leaveScheduleRecord: [],
            }    
        case actionTypes.LEAVE_SCHEDULE_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                leaveScheduleList: action.leaveScheduleList,
                showUpdateForm: false,
                showViewPage: false,
                leaveScheduleRecord: [],
            }
        case actionTypes.LEAVE_SCHEDULE_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                leaveScheduleRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.LEAVE_SCHEDULE_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_LEAVE_SCHEDULE_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_LEAVE_SCHEDULE_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                leaveScheduleRecord: [],
            }
        default:
            return state;
    }
}

export default LeaveScheduleReducer;