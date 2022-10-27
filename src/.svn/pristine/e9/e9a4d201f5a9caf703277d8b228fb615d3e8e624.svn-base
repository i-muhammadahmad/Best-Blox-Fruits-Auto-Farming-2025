import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    holidayCategoryList: [],
    holidayCategoryParentList: [],
    holidayCategoryRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    officeList: []
}

const HolidayCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.HOLIDAY_CATEGORY_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.OFFICE_SUCCESS:
            return {
                ...state,
                Loading: false,
                officeList: action.officeList
            }
        case actionTypes.HOLIDAY_CATEGORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                holidayCategoryList: action.holidayCategoryList,
                showUpdateForm: false,
                showViewPage: false,
                holidayCategoryRecord: [],
            }
        case actionTypes.HOLIDAY_CATEGORY_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                holidayCategoryRecord: [],
            }
        case actionTypes.HOLIDAY_CATEGORY_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                holidayCategoryParentsList: action.holidayCategoryParentsList
            }
        case actionTypes.HOLIDAY_CATEGORY_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                holidayCategoryRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.HOLIDAY_CATEGORY_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_HOLIDAY_CATEGORY_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_HOLIDAY_CATEGORY_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                holidayCategoryRecord: [],
            }
        default:
            return state;
    }
}

export default HolidayCategoryReducer;
