import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    clientProductionSummary: [],
    
}

const dashboardProductionReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PRODUCTION_DASHBOARD_REQUEST:
            return {
                ...state,
                Loading: true,
            }
        case actionTypes.CLIENT_PRODUCTION_SUMMARY_SUCCESS:
            return {
                ...state,
                Loading: false,
                clientProductionSummary: action.clientProductionSummary
            } 
        default:
            return state;
    }
}

export default dashboardProductionReducer;