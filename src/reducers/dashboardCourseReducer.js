import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    courseDashboardOfficeSummary: [],
    courseDashboardAllSummaryHeader: [],
    courseDashboardAllSummary: []
    
}

const dashboardCourseReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.COURSE_DASHBOARD_REQUEST:
            return {
                ...state,
                Loading: true,
            }
        case actionTypes.COURSE_DASHBOARD_OFFICE_SUCCESS:
            return {
                ...state,
                Loading: false,
                courseDashboardOfficeSummary: action.courseDashboardOfficeSummary,
            } 
        case actionTypes.COURSE_DASHBOARD_SUMMARY_SUCCESS:
            return {
                ...state,
                Loading: false,
                courseDashboardAllSummaryHeader: action.courseDashboardAllSummaryHeader,
                courseDashboardAllSummary: action.courseDashboardAllSummary
            } 
        default:
            return state;
    }
}

export default dashboardCourseReducer;