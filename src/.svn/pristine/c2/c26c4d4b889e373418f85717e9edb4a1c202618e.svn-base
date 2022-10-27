import axios from 'axios';
import { API_URL } from 'configs'

export const LEAVE_CONFIG_REQUEST = 'LEAVE_CONFIG_REQUEST'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const LEAVE_CONFIG_SUCCESS = 'LEAVE_CONFIG_SUCCESS'
export const LEAVE_CONFIG_SERVER_SUCCESS = 'LEAVE_CONFIG_SERVER_SUCCESS'
export const LEAVE_CONFIG_BY_OFFICE_SUCCESS = 'LEAVE_CONFIG_BY_OFFICE_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const leaveConfigsRequest = () => ({
  type: LEAVE_CONFIG_REQUEST,
})

const leaveConfigsSuccess = report_data => ({
  type: LEAVE_CONFIG_SUCCESS,
  leaveConfigList: report_data.leaveConfigList,
  leaveTypeList: report_data.leaveTypeList,
})

const getLeaveConfigByOfficeSuccess = report_data => ({
  type: LEAVE_CONFIG_BY_OFFICE_SUCCESS,
  leaveConfigByOfficeList: report_data,
})

const leaveConfigAddUpadteSuccess = (message, dispatch) => {
  dispatch(leaveConfigSuccessNotification(message))
}

const leaveConfigSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

const leaveConfigsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const getLeaveConfigsList = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveConfigsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_config/getLeaveConfigsList", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => {
      dispatch(leaveConfigsSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const getLeaveConfigByOfficeId = (office_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveConfigsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_config/getByOfficeId/" + office_id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getLeaveConfigByOfficeSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addUpdateLeaveConfig = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveConfigsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_config/save", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        leaveConfigAddUpadteSuccess('Leave Cofigs Saved Successfully', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

// handling error reponse   
const handleErrorResponse = (error, dispatch) => {
  try {
    if (error.response.status === 422 && error.response.data.error) {
      //dispatch(validationError(error.response.data.error))
    }
    else if (error.response.status === 401 && error.response.data.error) {
      dispatch(tokenError(error.response.data.error.toString()))
    }
    else {
      let err = '';
      if (error.response.data.error) {
        err = error.response.data.error.toString()
      }
      else {
        err = error.response.status + ` ` + error.response.statusText
      }
      dispatch(leaveConfigsFailure(err))
    }
  }
  catch (e) {
    dispatch(leaveConfigsFailure('Unable to perform action.Something went wrong'))
  }
}   