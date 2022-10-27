import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    workstationsList: [],
    workstationsRecord: [],
    workstationsByOfficeList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const WorkstationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WORKSTATIONS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.WORKSTATIONS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                workstationsRecord: [],
            }    
        case actionTypes.WORKSTATIONS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                workstationsList: action.workstationsList,
                showUpdateForm: false,
                showViewPage: false,
                workstationsRecord: [],
            }
        case actionTypes.WORKSTATIONS_BY_OFFFICE_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                workstationsByOfficeList: action.workstationsByOfficeList,
            }    
        case actionTypes.WORKSTATIONS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                workstationsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.WORKSTATIONS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_WORKSTATIONS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_WORKSTATIONS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                workstationsRecord: [],
            }
        default:
            return state;
    }
}

export default WorkstationsReducer;