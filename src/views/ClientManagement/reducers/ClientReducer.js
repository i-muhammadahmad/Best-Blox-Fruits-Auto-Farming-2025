import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    clientList: [],
    clientManagerList: [],
    clientByOfficesList: [],
    clientDropdownList: [],
    clientRecord: [],
    availableOffices: [],
    addedOffices: [],
    removedOffices: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ClientReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CLIENT_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.CLIENT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                clientRecord: [],
                availableOffices: [],
                addedOffices: [],
                removedOffices: [],
            }    
        case actionTypes.CLIENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                clientList: action.clientList,
                showUpdateForm: false,
                showViewPage: false,
                clientRecord: [],
                availableOffices: [],
                addedOffices: [],
                removedOffices: [],
            }
        case actionTypes.CLIENT_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientDropdownList: action.clientDropdownList,
            }
        case actionTypes.CLIENT_BY_OFFICES_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientByOfficesList: action.clientByOfficesList,
            }
        case actionTypes.CLIENT_MANAGER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                clientManagerList: action.clientManagerList
            }
        case actionTypes.CLIENT_INTERFACE_OFFICES_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                availableOffices: action.offices,
                addedOffices: [],
                removedOffices: [],
            }
        case actionTypes.addRemoveOffices:
            return {
                ...state,
                availableOffices: action.a_offices,
                addedOffices: action.added_offices,
                removedOffices: action.removed_offices
            }
        case actionTypes.CLIENT_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                clientRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.CLIENT_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_CLIENT_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_CLIENT_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                clientRecord: [],
                availableOffices: [],
                addedOffices: [],
                removedOffices: [],
            }
        default:
            return state;
    }
}

export default ClientReducer;
