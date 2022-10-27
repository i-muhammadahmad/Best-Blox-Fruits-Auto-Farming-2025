import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    clientHeadcountList: [],
    clientHeadcountRecord: [],
    clientHeadcountDropdownList: [],
    clientHeadcountCheckpointsList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ClientHeadcountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_HEADCOUNT_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.CLIENT_HEADCOUNT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                clientHeadcountRecord: [],
            }
        case actionTypes.CLIENT_HEADCOUNT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                clientHeadcountList: action.clientHeadcountList,
                showUpdateForm: false,
                showViewPage: false,
                clientHeadcountRecord: [],
            }
        case actionTypes.CLIENT_HEADCOUNT_DROPDOWN_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientHeadcountDropdownList: action.clientHeadcountDropdownList,
            }
        case actionTypes.CLIENT_HEADCOUNT_CHECKPOINT_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientHeadcountCheckpointsList: action.clientHeadcountCheckpointsList,
            }
        case actionTypes.CLIENT_HEADCOUNT_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                clientHeadcountRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.CLIENT_HEADCOUNT_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_CLIENT_HEADCOUNT_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_CLIENT_HEADCOUNT_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                clientHeadcountRecord: [],
            }
        default:
            return state;
    }
}

export default ClientHeadcountReducer;