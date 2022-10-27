import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    employeesList: [],
    employeesDropdownList: [],
    approvalProfileEmployeeList: [],
    employeesRecord: [],
    employeeLatestShift: [],
    employeeAssetsList: [],
    validation_error: "",
    emp_designation_validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const EmployeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMPLOYEES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                emp_designation_validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.EMPLOYEES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                emp_designation_validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                employeesRecord: [],
            }
        case actionTypes.EMPLOYEES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                emp_designation_validation_error: "",
                employeesList: action.employeesList,
                showUpdateForm: false,
                showViewPage: false,
                employeesRecord: [],
            }
        case actionTypes.EMPLOYEES_CUSTOM_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                approvalProfileEmployeeList: action.approvalProfileEmployeeList,
            }
        case actionTypes.EMPLOYEES_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                employeesDropdownList: action.employeesDropdownList,
            }
        case actionTypes.GET_EMPLOYEES_SHIFT_SUCCESS:
            return {
                ...state,
                Loading: false,
                employeeLatestShift: action.employeeLatestShift,
            }
        case actionTypes.GET_EMPLOYEES_HOLIDAY_SUCCESS:
            return {
                ...state,
                Loading: false,
                employeeHolidays: action.employeeHolidays,
            }
        case actionTypes.EMPLOYEES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                employeesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.EMPLOYEES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_EMPLOYEES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.EMPLOYEES_DESIGNATION_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                emp_designation_validation_error: action.emp_designation_validation_error,
            }
        case actionTypes.HIDE_EMPLOYEES_DESIGNATION_FEILD_VALIDATION_ERROR:
            if (state.emp_designation_validation_error && state.emp_designation_validation_error[action.feild_key])
                delete state.emp_designation_validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                emp_designation_validation_error: action.emp_designation_validation_error,

            }    
        case actionTypes.REDIRECT_TO_EMPLOYEES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                employeesRecord: [],
            }
        case actionTypes.EMPLOYEES_ASSETS_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                employeeAssetsList: action.employeeAssetsList,
            }    
        default:
            return state;
    }
}

export default EmployeesReducer;