import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    companyTypeList: [],
    companyTypeRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const CompanyTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_TYPE_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.COMPANY_TYPE_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                companyTypeList: action.companyTypeList,
                showUpdateForm: false,
                showViewPage: false,
                companyTypeRecord: [],
            }
        case actionTypes.COMPANY_TYPE_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                companyTypeRecord: [],
            }    
        case actionTypes.COMPANY_TYPE_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                companyTypeRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.COMPANY_TYPE_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_COMPANY_TYPE_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_COMPANY_TYPE_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                companyTypeRecord: [],
            }
        default:
            return state;
    }
}

export default CompanyTypeReducer;