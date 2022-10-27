import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    bindedQuizList: [],
    quizRecord: [],
    quizBindingId: '',
    validation_error: "",
    certificate_path: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
    quiz_attemp_status: '',
    scoring_percentage: ''
}

const QuizReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.QUIZ_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.QUIZ_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                bindedQuizList: action.bindedQuizList,
                showUpdateForm: false,
                showViewPage: false,
                quizRecord: [],
                quizBindingId: '',
                certificate_path: "",
                quiz_attemp_status: '',
                scoring_percentage: '',
            }
        case actionTypes.QUIZ_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                quizRecord: [],
                quizBindingId: '',
                certificate_path: "",
                quiz_attemp_status: '',
                scoring_percentage: '',
            }    
        case actionTypes.QUIZ_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                quizRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false,
                quiz_attemp_status: '',
                scoring_percentage: '',
            }
        case actionTypes.QUIZ_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_QUIZ_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_QUIZ_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                quizRecord: [],
            }
        case actionTypes.SET_BINDING_ID:
            return {
                ...state,
                quizBindingId: action.binding_id,
            }  
        case actionTypes.SET_CERTIFICATE_PATH:
            return {
                ...state,
                certificate_path: action.certificate_path,
            }  
        case actionTypes.SET_QUIZ_STATUS:
            return {
                ...state,
                quiz_attemp_status: action.quiz_attemp_status,
                scoring_percentage: action.scoring_percentage,
            }         
        default:
            return state;
    }
}

export default QuizReducer;