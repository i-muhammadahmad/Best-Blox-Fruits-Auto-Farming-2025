import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    companyList: [],
    clientCompaniesList: [],
    companyRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const CompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.COMPANY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                companyList: action.companyList,
                showUpdateForm: false,
                showViewPage: false,
                companyRecord: [],
            }
        case actionTypes.COMPANY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                companyRecord: [],
            }    
        case actionTypes.CLIENT_COMPANIES_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientCompaniesList: action.clientCompaniesList,
            }    
        case actionTypes.COMPANY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                companyRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.COMPANY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_COMPANY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_COMPANY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                companyRecord: [],
            }
        default:
            return state;
    }
}

export default CompanyReducer;