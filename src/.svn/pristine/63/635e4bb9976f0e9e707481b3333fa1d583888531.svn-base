import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    ticketsCategoryList: [],
    ticketsCategoryParentList: [],
    ticketsCategoryRecord: [],
    ticketsCategoryByAttrList: [],
    ticketsCategoryDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const TicketsCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.TICKETS_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.TICKETS_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                ticketsCategoryRecord: [],
            }
        case actionTypes.TICKETS_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                ticketsCategoryList: action.ticketsCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                ticketsCategoryRecord: [],
            }
        case actionTypes.TICKETS_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                ticketsCategoryDropdownList: action.ticketsCategoryDropdownList,
            }
        case actionTypes.ACTIVITY_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                ticketsCategoryByAttrList: action.ticketsCategoryByAttrList,
            }
        case actionTypes.TICKETS_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                ticketsCategoryParentsList: action.ticketsCategoryParentsList
            }
        case actionTypes.TICKETS_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                ticketsCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.TICKETS_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_TICKETS_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_TICKETS_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                ticketsCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default TicketsCategoryReducer;