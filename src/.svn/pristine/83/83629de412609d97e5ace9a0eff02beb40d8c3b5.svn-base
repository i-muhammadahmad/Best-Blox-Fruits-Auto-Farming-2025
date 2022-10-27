import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    ticketsList: [],
    ticketsRecord: [],
    ticketsStatusDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const TicketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TICKETS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.TICKETS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                ticketsRecord: [],
            }
        case actionTypes.TICKETS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                ticketsList: action.ticketsList,
                showUpdateForm: false,
                showViewPage: false,
                ticketsRecord: [],
            }
        case actionTypes.TICKETS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                ticketsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.TICKETS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.TICKETS_STATUS_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                ticketsStatusDropdownList: action.ticketsStatusDropdownList,
            }
        case actionTypes.HIDE_TICKETS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_TICKETS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                ticketsRecord: [],
            }
        default:
            return state;
    }
}

export default TicketsReducer;