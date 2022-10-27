import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    assetsHistoryList: [],
}

const AssetsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ASSETS_HISTORY_REQUEST:
            return {
                ...state,
                Loading: true,
                
            }
        case actionTypes.ASSETS_HISTORY_SUCCESS:
            return {
                ...state,
                Loading: false,
                assetsHistoryList: action.assetsHistoryList,
            }
        default:
            return state;
    }
}

export default AssetsHistoryReducer;