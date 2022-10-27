import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    timeZonesList: [],
    timeZonesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const TimeZonesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TIME_ZONES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.TIME_ZONES_SERVER_REQUEST:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                timeZonesRecord: [],
            }    
        case actionTypes.TIME_ZONES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                timeZonesList: action.timeZonesList,
                showUpdateForm: false,
                showViewPage: false,
                timeZonesRecord: [],
            }
        case actionTypes.TIME_ZONES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                timeZonesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.TIME_ZONES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_TIME_ZONES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_TIME_ZONES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                timeZonesRecord: [],
            }
        default:
            return state;
    }
}

export default TimeZonesReducer;