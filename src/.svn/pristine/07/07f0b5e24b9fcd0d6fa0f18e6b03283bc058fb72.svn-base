import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    assetsReportList: [],
    assetsSummaryReportList: [],
    officesList: [],
}

const AssetsReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ASSETS_REPORT_REQUEST:
            return {
                ...state,
                Loading: true,
                redirect_to_list: false,
            }
        case actionTypes.ASSETS_REPORT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
            }    
        case actionTypes.ASSETS_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                assetsReportList: action.report_data,
            }
        case actionTypes.ASSETS_SUMMARY_REPORT_SUCCESS:
            return {
                ...state,
                Loading: false,
                assetsSummaryReportList: action.summary_report_list,
                officesList: action.offices_list,
            }    
        default:
            return state;
    }
}

export default AssetsReportReducer;