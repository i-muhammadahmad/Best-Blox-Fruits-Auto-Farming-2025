import * as actionTypes from 'actions';


const initialState = {
    Loading: false,
    documentsCategoryList: [],
    documentsCategoryParentList: [],
    documentsCategoryRecord: [],
    documentsCategoryByAttrList: [],
    documentsCategoryDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const DocumentsCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.DOCUMENTS_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.DOCUMENTS_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                documentsCategoryRecord: [],
            }
        case actionTypes.DOCUMENTS_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                documentsCategoryList: action.documentsCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                documentsCategoryRecord: [],
            }
        case actionTypes.DOCUMENTS_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                documentsCategoryDropdownList: action.documentsCategoryDropdownList,
            }
        case actionTypes.ACTIVITY_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                documentsCategoryByAttrList: action.documentsCategoryByAttrList,
            }
        case actionTypes.DOCUMENTS_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                documentsCategoryParentsList: action.documentsCategoryParentsList
            }
        case actionTypes.DOCUMENTS_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                documentsCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.DOCUMENTS_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_DOCUMENTS_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_DOCUMENTS_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                documentsCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default DocumentsCategoryReducer;