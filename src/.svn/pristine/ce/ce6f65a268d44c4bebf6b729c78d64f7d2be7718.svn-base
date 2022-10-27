import axios from 'axios';
import { API_URL } from 'configs';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const ASSETS_HISTORY_REQUEST = 'ASSETS_HISTORY_REQUEST';
export const ASSETS_HISTORY_SUCCESS = 'ASSETS_HISTORY_SUCCESS';

const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
});
const hideCommonLoader = () => ({
  type: HIDE_LOADER
});

const assetsHistoryRequest = () => ({
  type: ASSETS_HISTORY_REQUEST
});

const assetsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
});

const validationError = notification => ({});

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
});

const assetsHistoryListSuccessById = assetsHistoryList => ({
  type: ASSETS_HISTORY_SUCCESS,
  assetsHistoryList: assetsHistoryList
});

export const assestsHistoryListById = (id) => {
  var token = localStorage.getItem('token');
  return dispatch => {
    dispatch(assetsHistoryRequest());
    dispatch(showCommonLoader());
    return axios(API_URL + 'assets/getAssetsHistoryById/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(
      response => {
        dispatch(hideCommonLoader());
        dispatch(assetsHistoryListSuccessById(response.data));
      },
      error => {
        dispatch(hideCommonLoader());
        handleErrorResponse(error, dispatch);
      }
    );
  };
};

// handling error reponse
const handleErrorResponse = (error, dispatch) => {
  try {
    if (error.response.status === 422 && error.response.data.error) {
      dispatch(validationError(error.response.data.error));
    } else if (error.response.status === 401 && error.response.data.error) {
      dispatch(tokenError(error.response.data.error.toString()));
    } else {
      let err = '';
      if (error.response.data.error) {
        err = error.response.data.error.toString();
      } else {
        err = error.response.status + ` ` + error.response.statusText;
      }
      dispatch(assetsFailure(err));
    }
  } catch (e) {
    dispatch(assetsFailure('Unable to perform action.Something went wrong'));
  }
};
