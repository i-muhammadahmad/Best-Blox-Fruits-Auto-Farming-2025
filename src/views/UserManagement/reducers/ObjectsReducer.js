import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    objectsList: [],
    objectsParentList: [],
    objectsRecord: [],
    objectsNestedTree: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ObjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OBJECTS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.OBJECTS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                objectsRecord: [],
            }    
        case actionTypes.OBJECTS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                objectsList: action.objectsList,
                showUpdateForm: false,
                showViewPage: false,
                objectsRecord: [],
            }
        case actionTypes.OBJECTS_PARENT_SUCCESS:
            return {
                ...state, 
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                objectsParentsList: action.objectsParentsList
            }
        case actionTypes.OBJECTS_NESTED_TREE_SUCCESS:
            return {
                ...state, 
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                objectsNestedTree: action.objectsNestedTree
            }
        case actionTypes.OBJECTS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                objectsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.OBJECTS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_OBJECTS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_OBJECTS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                objectsRecord: [],
            }
        default:
            return state;
    }
}

export default ObjectsReducer;