import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    objectTypesList: [],
    objectTypesRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ObjectTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OBJECT_TYPES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.OBJECT_TYPES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                objectTypesList: action.objectTypesList,
                showUpdateForm: false,
                showViewPage: false,
                objectTypesRecord: [],
            }    
        case actionTypes.OBJECT_TYPES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                objectTypesList: action.objectTypesList,
                showUpdateForm: false,
                showViewPage: false,
                objectTypesRecord: [],
            }
        case actionTypes.OBJECT_TYPES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                objectTypesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.OBJECT_TYPES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_OBJECT_TYPES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_OBJECT_TYPES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                objectTypesRecord: [],
            }
        default:
            return state;
    }
}

export default ObjectTypesReducer;