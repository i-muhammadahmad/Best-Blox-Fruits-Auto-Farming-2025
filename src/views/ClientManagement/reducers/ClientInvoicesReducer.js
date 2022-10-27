import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    clientInvoicesList: [],
    clientInvoicesRecord: [],
    curPeriodInvoice: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    client_invoice_add_update_status: false,
}

const ClientInvoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_INVOICES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.CLIENT_INVOICES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                clientInvoicesList: action.clientInvoicesList,
                showUpdateForm: false,
                showViewPage: false,
                clientInvoicesRecord: [],
                client_invoice_add_update_status: false
            }
        case actionTypes.CLIENT_INVOICES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                clientInvoicesRecord: [],
                client_invoice_add_update_status: false
            }    
        case actionTypes.GET_CUR_PERIOD_INVOICE_SUCCESS:
            return {
                ...state,
                Loading: false,
                curPeriodInvoice: action.curPeriodInvoice
            }      
        case actionTypes.CLIENT_INVOICE_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                showUpdateForm: false,
                showViewPage: false,
                redirect_to_list: true,
            } 
        case actionTypes.CLIENT_INVOICES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                clientInvoicesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.CLIENT_INVOICES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_CLIENT_INVOICES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_CLIENT_INVOICES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                clientInvoicesRecord: [],
            }
        case actionTypes.SHOW_CLIENT_INVOICES_ADD_FORM:
            return {
                ...state,
                redirect_to_list: false,
                showUpdateForm: true,
                showViewPage: false,
                validation_error: '',
                clientInvoicesRecord: [],
            }
        default:
            return state;
    }
}

export default ClientInvoicesReducer;