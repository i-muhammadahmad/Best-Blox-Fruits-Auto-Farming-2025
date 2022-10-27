import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    activityCategoryList: [],
    activityCategoryParentList: [],
    activityCategoryRecord: [],
    activityCategoriesByAttrList: [],
    activityCategoriesDropdownList: [],
    activityAllParentCategoriesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ActivityCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ACTIVITY_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ACTIVITY_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                activityCategoryRecord: [],
            }
        case actionTypes.ACTIVITY_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                activityCategoryList: action.activityCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                activityCategoryRecord: [],
            }
        case actionTypes.ACTIVITY_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                activityCategoriesDropdownList: action.activityCategoriesDropdownList,
            }
        case actionTypes.ACTIVITY_ALL_PARENT_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                activityAllParentCategoriesDropdownList: action.activityAllParentCategoriesDropdownList,
            }
        case actionTypes.ACTIVITY_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                activityCategoriesByAttrList: action.activityCategoriesByAttrList,
            }
        case actionTypes.ACTIVITY_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                activityCategoryParentsList: action.activityCategoryParentsList
            }
        case actionTypes.ACTIVITY_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                activityCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.ACTIVITY_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_ACTIVITY_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_ACTIVITY_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                activityCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default ActivityCategoryReducer;