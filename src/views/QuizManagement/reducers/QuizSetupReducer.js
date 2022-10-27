import * as actionTypes from 'actions';
import { isEmpty } from 'lodash';

const initialState = {
    Loading: false,
    quizSetupList: [],
    quizLevelList: [],
    quizSetupRecord: [],
    slidesParentList: [],
    quizSlidesList: [],
    quizNestedSlidesList: [],
    validation_error: "",
    slide_validation_error: "",
    quiz_id: "",
    quiz_add_update_success: false,
    slide_add_update_status: false,
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    binding_validation_error: "",
    binding_add_update_status: false,
    quizBindingList: [],
}

const QuizSetupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.QUIZ_SETUP_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.QUIZ_SETUP_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                quizSetupList: action.quizSetupList,
                showUpdateForm: false,
                showViewPage: false,
                quizSetupRecord: [],
                quiz_id: "",
                quiz_add_update_success: false,
                slide_add_update_status: false,
                quizSlidesList: [],
                quizNestedSlidesList: []
            }
        case actionTypes.QUIZ_SETUP_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                quizSetupRecord: [],
                quiz_id: "",
                quiz_add_update_success: false,
                slide_add_update_status: false,
                quizSlidesList: [],
                quizNestedSlidesList: []
            }
        case actionTypes.QUIZ_SLIDES_SUCCESS:
            return {
                ...state,
                slide_validation_error: "",
                slide_add_update_status: false,
                quizSlidesList: action.quizSlidesList,
                quizNestedSlidesList: action.quizNestedSlidesList
            }
        case actionTypes.QUIZ_ADD_UPDATE_SUCCESS:
            return {
                ...state,
                Loading: false,
                quiz_id: !isEmpty(action.quiz_id) ? action.quiz_id : state.quiz_id,
                quiz_add_update_success: !isEmpty(action.quiz_id) ? true : false,
            }
        case actionTypes.SET_QUIZ_ID:
            return {
                ...state,
                Loading: false,
                quiz_id: action.quiz_id
            }
        case actionTypes.SLIDE_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                slide_add_update_status: action.slide_add_update_status,
            }
        case actionTypes.SET_QUIZ_ADD_UPDATE_STATUS_FALSE:
            return {
                ...state,
                quiz_add_update_success: false,
            }
        case actionTypes.QUIZ_LEVEL_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                quizLevelList: action.quizLevelList,
            }
        case actionTypes.SLIDES_PARENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                slidesParentList: action.slidesParentList,
            }
        case actionTypes.QUIZ_SETUP_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                quizSetupRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.QUIZ_SETUP_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.QUIZ_SLIDES_VALIDATION_ERROR:
            return {
                ...state,
                slide_validation_error: action.slide_validation_error,
            }
        case actionTypes.HIDE_SLIDE_FEILD_VALIDATION_ERROR:
            if (state.slide_validation_error && state.slide_validation_error[action.feild_key])
                delete state.slide_validation_error[action.feild_key]
            return {
                ...state,
                slide_validation_error: action.slide_validation_error,

            }
        case actionTypes.HIDE_QUIZ_SETUP_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_QUIZ_SETUP_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                quizSetupRecord: [],
            }

        case actionTypes.QUIZ_BINDING_VALIDATION_ERROR:
            return {
                ...state,
                binding_validation_error: action.binding_validation_error,
            }
        case actionTypes.HIDE_BINDING_FEILD_VALIDATION_ERROR:
            if (state.binding_validation_error && state.binding_validation_error[action.feild_key])
                delete state.binding_validation_error[action.feild_key]
            return {
                ...state,
                binding_validation_error: action.binding_validation_error,

            }
        case actionTypes.BINDING_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                binding_add_update_status: action.binding_add_update_status,
            }
        case actionTypes.QUIZ_BINDING_SUCCESS:
            return {
                ...state,
                binding_validation_error: "",
                binding_add_update_status: false,
                quizBindingList: action.quizBindingList,
            }
        case actionTypes.QUIZ_BINDING_SERVER_SUCCESS:
            return {
                ...state,
                binding_validation_error: "",
                binding_add_update_status: false,
            }    
        default:
            return state;
    }
}

export default QuizSetupReducer;