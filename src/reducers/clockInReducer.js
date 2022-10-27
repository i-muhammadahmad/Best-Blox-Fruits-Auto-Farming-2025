import * as actionTypes from 'actions';

const initialState = {
  running: false,
  work_from: 'Office',
  hours: 0,
  minutes: 0,
  seconds: 0,
  status: 'At Desk',
  description: '',
  ip_address: '0.0.0.1',
  loading: false,
  activeCam:false,
  iconbackgroundcolor: 'orange',
  iconclassname: 'notificationsButton_stop',
  loggedEntries: [],
  clockInSummary: [],
  showClockInModel: false
};

const clockInReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER: {
      return {
        ...state,
        running: true,
        status: 'At Desk',
      };
    }
    case actionTypes.CLOCKIN_SUMMARY_SUCCESS: {
      return {
        ...state,
        clockInSummary: action.clockInSummary,
        showClockInModel: true
      };
    }
    case actionTypes.HIDE_SUMMARY_MODEL: {
      return {
        ...state,
        clockInSummary: [],
        showClockInModel: false
      };
    }
    case actionTypes.CHANGE_INITIAL_STATE: {
      return {
        ...state,
        seconds: action.details,
        status: 'At Desk',
        running: true,
        iconbackgroundcolor: 'green',
        iconclassname: 'notificationsButton_running',
        
      }
    }
    case actionTypes.CHANGE_INITIAL_STATE_ON_BREAK: {
      return {
        ...state,
        seconds: action.details,
        status: 'On Break',
        running: false,
        iconbackgroundcolor: 'orange',
        iconclassname: 'notificationsButton_stop',
        
      }
    }
    case actionTypes.PAUSE_TIMER: {
      return {
        ...state,
        running: false,
        status: 'On Break',
      };
    }
    case actionTypes.UPDATE_TIMER: {

      return {
        ...state,
        seconds: state.seconds + 1,
      };
    }
    case actionTypes.UPDATE_ACTVECAM: {

      return {
        ...state,
        activeCam: !(state.activeCam),
      };
    }
    case actionTypes.END_TIMER: {
      return {
        ...state,
        seconds: 0,
        running: false,
      };
    }

    case actionTypes.TAKE_PHOTO: {
      return {
        ...state,
        seconds: 0,
        running: false,
      };
    }
    case actionTypes.STORE_IP: {
      return {
        ...state,
        ip_address: action.details.data.IPv4
      }
    }
    case actionTypes.SET_LOG_ENTRIES: {

      return {
        ...state,
        loggedEntries: action.details
      }
    }

    default: {
      return state;
    }
  }
};

export default clockInReducer;
