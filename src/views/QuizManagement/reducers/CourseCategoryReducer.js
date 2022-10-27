import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    courseCategoryList: [],
    courseCategoryParentList: [],
    courseCategoryRecord: [],
    courseCategoriesByAttrList: [],
    courseCategoriesDropdownList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const CourseCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.COURSE_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.COURSE_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                courseCategoryRecord: [],
            }
        case actionTypes.COURSE_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                courseCategoryList: action.courseCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                courseCategoryRecord: [],
            }
        case actionTypes.COURSE_CATEGORY_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                courseCategoriesDropdownList: action.courseCategoriesDropdownList,
            }
        case actionTypes.COURSE_CATEGORIES_BY_ATTR_SUCCESS:
            return {
                ...state,
                Loading: false,
                courseCategoriesByAttrList: action.courseCategoriesByAttrList,
            }
        case actionTypes.COURSE_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                courseCategoryParentsList: action.courseCategoryParentsList
            }
        case actionTypes.COURSE_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                courseCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.COURSE_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_COURSE_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_COURSE_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                courseCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default CourseCategoryReducer;