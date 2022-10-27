import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    auditFormInfractionCategoryList: [],
    auditFormInfractionCategoryParentList: [],
    auditFormInfractionCategoryRecord: [],
    auditFormInfractionCategoriesByAttrList: [],
    auditFormInfractionCategoriesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const AuditFormInfractionCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                auditFormInfractionCategoryRecord: [],
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormInfractionCategoryList: action.auditFormInfractionCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                auditFormInfractionCategoryRecord: [],
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormInfractionCategoriesDropdownList: action.auditFormInfractionCategoriesDropdownList,
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                auditFormInfractionCategoriesByAttrList: action.auditFormInfractionCategoriesByAttrList,
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                auditFormInfractionCategoryParentsList: action.auditFormInfractionCategoryParentsList
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                auditFormInfractionCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.AUDIT_FORM_IFRACTION_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_AUDIT_FORM_IFRACTION_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_AUDIT_FORM_IFRACTION_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                auditFormInfractionCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default AuditFormInfractionCategoryReducer;