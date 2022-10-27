import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    is_flag_cleared: false,
    userActivityTrackReportList: [],
    userClockInImagesReportList: [],
    userClockInChartsReportList: [],
    usersList: [],
}

const UserReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REPORT_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
                is_flag_cleared: false,
            }
        case actionTypes.ACTIVITY_TRACK_REPORT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
            }    
        case actionTypes.USER_ACTIVITY_TRACK_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                userActivityTrackReportList: action.report_data,
            }
        case actionTypes.USER_CLOCK_IN_IMAGES_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                userClockInImagesReportList: action.report_data,
            }
        case actionTypes.USER_CLOCK_IN_CHART_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                is_flag_cleared: false,
                userClockInChartsReportList: action.report_data,
            }
        case actionTypes.USERS_LOG_SUCCESS:
            return {
                ...state,
                Loading: false,
                usersList: action.usersList,
            }
        case actionTypes.FALSE_POSITIVE_SUCCESS:
            return {
                ...state,
                Loading: false,
                is_flag_cleared: true,
            }    

        default:
            return state;
    }
}

export default UserReportReducer;