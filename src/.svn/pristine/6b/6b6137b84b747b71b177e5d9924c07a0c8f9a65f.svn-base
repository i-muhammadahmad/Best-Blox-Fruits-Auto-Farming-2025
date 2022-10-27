import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    infractionsList: [],
    infractionsRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditInfractionsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.INFRACTIONS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.INFRACTIONS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                infractionsRecord: [],
            }
        case actionTypes.INFRACTIONS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                infractionsList: action.infractionsList,
                showUpdateForm: false,
                showViewPage: false,
                infractionsRecord: [],
            }
        case actionTypes.INFRACTIONS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                infractionsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.INFRACTIONS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_INFRACTIONS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_INFRACTIONS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                infractionsRecord: [],
            }
        default:
            return state;
    }
}

export default AuditInfractionsReducer;