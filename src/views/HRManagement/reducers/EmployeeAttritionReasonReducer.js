import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    employeeAttritionReasonList: [],
    employeeAttritionReasonParentList: [],
    employeeAttritionReasonRecord:[],
    employeeAttritionReasonDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const EmployeeAttritionReasonReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.EMPLOYEE_ATTRITION_REASON_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.EMPLOYEE_ATTRITION_REASON_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          employeeAttritionReasonRecord: [],
        }    
    case actionTypes.EMPLOYEE_ATTRITION_REASON_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          employeeAttritionReasonList: action.employeeAttritionReasonList,
          showUpdateForm: false,
          showViewPage: false,
          employeeAttritionReasonRecord: [],
        }
    case actionTypes.EMPLOYEE_ATTRITION_REASON_PARENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          employeeAttritionReasonParentsList: action.employeeAttritionReasonParentsList
        }  
    case actionTypes.EMPLOYEE_ATTRITION_REASON_DROPDOWN_LIST_SUCCESS:
        return {
            ...state, 
            Loading: false,
            employeeAttritionReasonDropdownList: action.employeeAttritionReasonDropdownList
        }         
    case actionTypes.EMPLOYEE_ATTRITION_REASON_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            employeeAttritionReasonRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.EMPLOYEE_ATTRITION_REASON_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_EMPLOYEE_ATTRITION_REASON_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_EMPLOYEE_ATTRITION_REASON_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            employeeAttritionReasonRecord: [],
        }
    default:
        return state;
    }
}

export default EmployeeAttritionReasonReducer;