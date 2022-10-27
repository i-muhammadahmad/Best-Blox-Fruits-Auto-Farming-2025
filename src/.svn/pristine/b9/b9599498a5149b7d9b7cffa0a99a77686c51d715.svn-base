import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    clientHeadcountList: [],
    clientHeadcountReport: [],
    seatsUtilizationReport: [],
}

const HeadcountReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADCOUNT_REPORT_REQUEST:
            return {
                ...state,
                Loading: true
            }
        case actionTypes.CLIENT_HEADCOUNT_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientHeadcountList: action.clientHeadcountList,
            }
        case actionTypes.CLIENT_WISE_HEADCOUNT_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientHeadcountReport: action.clientHeadcountReport,
            }
        case actionTypes.SEATS_UTILIZATION_REPORT_REQUEST:
            return {
                ...state,
                Loading: true
            }
        case actionTypes.SEATS_UTILIZATION_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                seatsUtilizationReport: action.seatsUtilizationReport,
            }   
        default:
            return state;
    }
}

export default HeadcountReportReducer;