import * as actionTypes from 'actions';

const initialState = {
  snackbar_notification: '',
  snackbar_notification_type: '',
  show_common_loader: false,
  common_loder_label: '',
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR: {
      return {
        ...state,
        snackbar_notification: action.snackbar_notification,
        snackbar_notification_type: action.snackbar_notification_type,
      };
    }
    case actionTypes.HIDE_SNACKBAR: {
      return {
        ...state,
        snackbar_notification: '',
        snackbar_notification_type: '',
      };
    }
    case actionTypes.SHOW_LOADER: {
      return {
        ...state,
        show_common_loader: true,
        common_loder_label: (action.common_loder_label)? action.common_loder_label:'' ,
      };
    }
    case actionTypes.HIDE_LOADER: {
      return {
        ...state,
        show_common_loader: false,
        common_loder_label: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
