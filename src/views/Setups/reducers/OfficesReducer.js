import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    officesList: [],
    officesDropdownList: [],
    countriesList: [],
    citiesList: [],
    officesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const OfficesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OFFICES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.OFFICES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                officesRecord: [],
            }
        case actionTypes.OFFICES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                officesList: action.officesList,
                showUpdateForm: false,
                showViewPage: false,
                officesRecord: [],
            }
        case actionTypes.OFFICES_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                officesDropdownList: action.officesDropdownList,
            }
        case actionTypes.COUNTRIES_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                countriesList: action.countriesList,
            }
        case actionTypes.CITIES_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                citiesList: action.citiesList,
            }
        case actionTypes.OFFICES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                officesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.OFFICES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_OFFICES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_OFFICES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                officesRecord: [],
            }
        default:
            return state;
    }
}

export default OfficesReducer;