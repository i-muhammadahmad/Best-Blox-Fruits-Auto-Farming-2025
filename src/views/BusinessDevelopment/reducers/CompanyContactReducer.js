import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    companyContactList: [],
    companyContactRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const CompanyContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_CONTACT_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.COMPANY_CONTACT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                companyContactList: action.companyContactList,
                showUpdateForm: false,
                showViewPage: false,
                companyContactRecord: [],
            }
        case actionTypes.COMPANY_CONTACT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                companyContactRecord: [],
            }
        case actionTypes.COMPANY_CONTACT_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                companyContactRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.COMPANY_CONTACT_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_COMPANY_CONTACT_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_COMPANY_CONTACT_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                companyContactRecord: [],
            }
        default:
            return state;
    }
}

export default CompanyContactReducer;