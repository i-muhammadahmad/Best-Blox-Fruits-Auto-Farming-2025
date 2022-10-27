import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    employeeShiftsList: [],
    employeeShiftsRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    employee_shift_add_update_status: false,
}

const EmployeeShiftsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPLOYEE_SHIFTS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.EMPLOYEE_SHIFTS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                employeeShiftsList: action.employeeShiftsList,
                showUpdateForm: false,
                showViewPage: false,
                employeeShiftsRecord: [],
                employee_shift_add_update_status: false
            }
        case actionTypes.EMPLOYEE_SHIFT_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                employee_shift_add_update_status: action.add_update_status,
            } 
        case actionTypes.EMPLOYEE_SHIFTS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                employeeShiftsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.EMPLOYEE_SHIFTS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_EMPLOYEE_SHIFTS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_EMPLOYEE_SHIFTS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                employeeShiftsRecord: [],
            }
        default:
            return state;
    }
}

export default EmployeeShiftsReducer;