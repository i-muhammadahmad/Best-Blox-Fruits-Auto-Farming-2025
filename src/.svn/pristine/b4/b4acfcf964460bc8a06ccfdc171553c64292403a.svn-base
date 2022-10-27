import * as actionTypes from 'actions';

const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.notifications
      };
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;
