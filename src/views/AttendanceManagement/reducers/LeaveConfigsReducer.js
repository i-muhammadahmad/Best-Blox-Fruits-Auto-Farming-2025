import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    leaveConfigList: [],
    leaveTypeList: [],
    leaveConfigByOfficeList: []
}

const LeaveConfigsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LEAVE_CONFIG_REQUEST:
            return {
                ...state,
                Loading: true,
                redirect_to_list: false,
            } 
        case actionTypes.LEAVE_CONFIG_SUCCESS:
            return {
                ...state,
                Loading: false,
                leaveConfigList: action.leaveConfigList,
                leaveTypeList: action.leaveTypeList,
            }  
        case actionTypes.LEAVE_CONFIG_BY_OFFICE_SUCCESS:
            return {
                ...state,
                Loading: false,
                leaveConfigByOfficeList: action.leaveConfigByOfficeList,
            }      
        default:
            return state;
    }
}

export default LeaveConfigsReducer;