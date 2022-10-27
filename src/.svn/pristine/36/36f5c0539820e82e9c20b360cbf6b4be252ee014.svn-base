import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    holidayList: [],
    holidayCategoryList: [],
    holidayRecord:[],
    holidayCalendarList:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const HolidayReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.HOLIDAY_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.HOLIDAY_SUCCESS:
        return {
          ...state,
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          holidayList: action.holidayList,
          showUpdateForm: false,
          showViewPage: false,
          holidayRecord: [],
        }
    case actionTypes.HOLIDAY_SERVER_SUCCESS:
        return {
          ...state,
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          holidayRecord: [],
        }
    case actionTypes.HOLIDAY_CALENDAR_SUCCESS:
        return {
          ...state,
          Loading: false,
          holidayCalendarList: action.holidayCalendarList,
        }
    case actionTypes.HOLIDAY_CATEGORY_SUCCESS:
        return {
          ...state,
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          holidayCategoryList: action.holidayCategoryList
        }

    case actionTypes.HOLIDAY_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            holidayRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.HOLIDAY_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_HOLIDAY_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_HOLIDAY_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            holidayRecord: [],
        }  
    default:
        return state;
    }
}

export default HolidayReducer;
