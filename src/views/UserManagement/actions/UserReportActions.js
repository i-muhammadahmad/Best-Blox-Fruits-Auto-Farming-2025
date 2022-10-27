import axios from 'axios';
import { API_URL } from 'configs'

export const USER_REPORT_REQUEST = 'USER_REPORT_REQUEST'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const USERS_LOG_SUCCESS = 'USERS_LOG_SUCCESS'
export const USER_ACTIVITY_TRACK_REPORT_SUCCESS = 'USER_ACTIVITY_TRACK_REPORT_SUCCESS'
export const USER_CLOCK_IN_IMAGES_REPORT_SUCCESS = 'USER_CLOCK_IN_IMAGES_REPORT_SUCCESS'
export const USER_CLOCK_IN_CHART_REPORT_SUCCESS = 'USER_CLOCK_IN_CHART_REPORT_SUCCESS'
export const FALSE_POSITIVE_SUCCESS = 'FALSE_POSITIVE_SUCCESS';
export const ACTIVITY_TRACK_REPORT_SERVER_SUCCESS = 'ACTIVITY_TRACK_REPORT_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const userReportRequest = () => ({
  type: USER_REPORT_REQUEST,
})

export const userActivityTrackReportServerSuccess = () => ({
  type: ACTIVITY_TRACK_REPORT_SERVER_SUCCESS
})

const userActivityTrackReportSuccess = report_data => ({
  type: USER_ACTIVITY_TRACK_REPORT_SUCCESS,
  report_data: report_data,
})

const userClockInImagesListSuccess = report_data => ({
  type: USER_CLOCK_IN_IMAGES_REPORT_SUCCESS,
  report_data: report_data,
})

const userClockInChartsReportSuccess = report_data => ({
  type: USER_CLOCK_IN_CHART_REPORT_SUCCESS,
  report_data: report_data,
})

const usersLogSuccess = (usersList) => ({
  type: USERS_LOG_SUCCESS,
  usersList: usersList,
})

const userReportSuccessMessage = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'success'
})

const userReportFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const getUserActivityTrack = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "user_reports/getAllActivityTrack", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(userActivityTrackReportSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getUserClockInImagesList = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "user_reports/getUserClockInImages", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(userClockInImagesListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getUserClockInChartsReport = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "user_reports/getUserClockInChartsReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(userClockInChartsReportSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getServerSideUserClockInImagesList = (filters) => {
  var token = localStorage.getItem("token")
  return axios(API_URL + "user_reports/getUserClockInImages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: filters
  })
    .then((response) => {
      //dispatch(userClockInImagesListSuccess(response.data))
      //dispatch(hideCommonLoader())
    }, (error) => {
      //handleErrorResponse(error, dispatch)
      //dispatch(hideCommonLoader())
    });
}

export const getTrackReportUsers = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "user/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(usersLogSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

//save false positive
export const saveFalsePositive = (id) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    //dispatch(activityCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "clockin/saveFalsePositive/" + id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(falsePositiveSuccess());
        dispatch(userReportSuccessMessage('Flag cleared successfully'));
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

const falsePositiveSuccess = () => ({
  type: FALSE_POSITIVE_SUCCESS
})

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
      dispatch(userReportFailure(err))
    }
  }
  catch (e) {
    dispatch(userReportFailure('Unable to perform action.Something went wrong'))
  }
}   