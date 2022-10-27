import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    departmentsList: [],
    departmentsDropdownList: [],
    departmentsRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const DepartmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEPARTMENTS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.DEPARTMENTS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                departmentsRecord: [],
            }
        case actionTypes.DEPARTMENTS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                departmentsList: action.departmentsList,
                showUpdateForm: false,
                showViewPage: false,
                departmentsRecord: [],
            }
        case actionTypes.DEPARTMENTS_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                departmentsDropdownList: action.departmentsDropdownList,
            }    
        case actionTypes.DEPARTMENTS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                departmentsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.DEPARTMENTS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_DEPARTMENTS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_DEPARTMENTS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                departmentsRecord: [],
            }
        default:
            return state;
    }
}

export default DepartmentsReducer;