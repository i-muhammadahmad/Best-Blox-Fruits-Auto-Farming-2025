import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    floorPlan: '',
    empDetails: []
}

const FloorPlanReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FLOOR_PLAN_REQUEST:
            return {
                ...state,
                Loading: true,
            }
        case actionTypes.FLOOR_PLAN_SUCCESS:
            return {
                ...state,
                Loading: false,
                floorPlan: action.floorPlan,
                empDetails: []
            }
        case actionTypes.EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                Loading: false,
                empDetails: action.empDetails
            }
        default:
            return state;
    }
}

export default FloorPlanReducer;