import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    documentsList: [],
    documentsRecord: [],
    documentsDropdownList: [],
    documentsListWithAccess: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const DocumentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DOCUMENTS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.DOCUMENTS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                documentsRecord: [],
            }
        case actionTypes.DOCUMENTS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                documentsList: action.documentsList,
                showUpdateForm: false,
                showViewPage: false,
                documentsRecord: [],
            }
        case actionTypes.DOCUMENTS_LIST_WITH_ACCESS_SUCCESS:
            return {
                ...state,
                Loading: false,
                documentsListWithAccess: action.documentsListWithAccess,
            }    
        case actionTypes.DOCUMENTS_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                documentsDropdownList: action.documentsDropdownList,
            }    
        case actionTypes.DOCUMENTS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                documentsRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.DOCUMENTS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_DOCUMENTS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_DOCUMENTS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                documentsRecord: [],
            }
        default:
            return state;
    }
}

export default DocumentsReducer;