import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    campaignSummary: [],
    
}

const dashboardCampaignReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CAMPAIGN_DASHBOARD_REQUEST:
            return {
                ...state,
                Loading: true,
            }
        case actionTypes.CAMPAIGN_SUMMARY_SUCCESS:
            return {
                ...state,
                Loading: false,
                campaignSummary: action.campaignSummary
            } 
        default:
            return state;
    }
}

export default dashboardCampaignReducer;