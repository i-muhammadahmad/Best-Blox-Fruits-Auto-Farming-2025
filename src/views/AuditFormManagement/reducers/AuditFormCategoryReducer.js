import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditFormCategoryList: [],
    auditFormCategoryParentList: [],
    auditFormCategoryRecord: [],
    auditFormCategoriesByAttrList: [],
    auditFormCategoriesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditFormCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.AUDIT_FORM_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.AUDIT_FORM_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                auditFormCategoryRecord: [],
            }
        case actionTypes.AUDIT_FORM_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormCategoryList: action.auditFormCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                auditFormCategoryRecord: [],
            }
        case actionTypes.AUDIT_FORM_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormCategoriesDropdownList: action.auditFormCategoriesDropdownList,
            }
        case actionTypes.AUDIT_FORM_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormCategoriesByAttrList: action.auditFormCategoriesByAttrList,
            }
        case actionTypes.AUDIT_FORM_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormCategoryParentsList: action.auditFormCategoryParentsList
            }
        case actionTypes.AUDIT_FORM_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                auditFormCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.AUDIT_FORM_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_AUDIT_FORM_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_AUDIT_FORM_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                auditFormCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default AuditFormCategoryReducer;