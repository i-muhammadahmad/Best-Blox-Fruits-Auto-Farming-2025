import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    breakTypesList: [],
    breakTypesParentList: [],
    breakTypesRecord: [],
    breakTypesByAttrList: [],
    breakTypesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const BreakTypesReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.BREAK_TYPES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.BREAK_TYPES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                breakTypesRecord: [],
            }
        case actionTypes.BREAK_TYPES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                breakTypesList: action.breakTypesList,
                showUpdateForm: false,
                showViewPage: false,
                breakTypesRecord: [],
            }
        case actionTypes.BREAK_TYPES_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                breakTypesDropdownList: action.breakTypesDropdownList,
            }
        case actionTypes.ACTIVITY_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                breakTypesByAttrList: action.breakTypesByAttrList,
            }
        case actionTypes.BREAK_TYPES_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                breakTypesParentsList: action.breakTypesParentsList
            }
        case actionTypes.BREAK_TYPES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                breakTypesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.BREAK_TYPES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_BREAK_TYPES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_BREAK_TYPES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                breakTypesRecord: [],
            }
        default:
            return state;
    }
}

export default BreakTypesReducer;