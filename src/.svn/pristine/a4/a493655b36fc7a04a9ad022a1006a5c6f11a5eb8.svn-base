import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    setupFloorPlanList: [],
    setupFloorPlansRecord: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const SetupFloorPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETUP_FLOOR_PLAN_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.SETUP_FLOOR_PLAN_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                setupFloorPlansRecord: [],
            }
        case actionTypes.SETUP_FLOOR_PLAN_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                setupFloorPlanList: action.setupFloorPlanList,
                showUpdateForm: false,
                showViewPage: false,
                setupFloorPlansRecord: [],
            }
        case actionTypes.SETUP_FLOOR_PLAN_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                setupFloorPlansRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.SETUP_FLOOR_PLAN_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_SETUP_FLOOR_PLAN_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_SETUP_FLOOR_PLAN_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                setupFloorPlansRecord: [],
            }
        default:
            return state;
    }
}

export default SetupFloorPlanReducer;