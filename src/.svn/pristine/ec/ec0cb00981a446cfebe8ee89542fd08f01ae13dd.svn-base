import axios from 'axios';
import { API_URL } from 'configs'

export const HEADCOUNT_REPORT_REQUEST = 'HEADCOUNT_REPORT_REQUEST'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const CLIENT_HEADCOUNT_REPORT_SUCCESS = 'CLIENT_HEADCOUNT_REPORT_SUCCESS'
export const CLIENT_WISE_HEADCOUNT_REPORT_SUCCESS = 'CLIENT_WISE_HEADCOUNT_REPORT_SUCCESS'
export const SEATS_UTILIZATION_REPORT_REQUEST = 'SEATS_UTILIZATION_REPORT_REQUEST'
export const SEATS_UTILIZATION_REPORT_SUCCESS = 'SEATS_UTILIZATION_REPORT_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const headcountReportRequest = () => ({
  type: HEADCOUNT_REPORT_REQUEST,
})

const clientHeadcountReportSuccess = (clientHeadcountList) => ({
  type: CLIENT_HEADCOUNT_REPORT_SUCCESS,
  clientHeadcountList: clientHeadcountList,
})

const clientWiseHeadcountReportSuccess = (clientHeadcountReport) => ({
  type: CLIENT_WISE_HEADCOUNT_REPORT_SUCCESS,
  clientHeadcountReport: clientHeadcountReport,
})

const headcountReportSuccessMessage = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'success'
})

const headcountReportFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const seatsUtilizationReportRequest = () => ({
  type: SEATS_UTILIZATION_REPORT_REQUEST,
})

const seatsUtilizationReportSuccess = (seatsUtilizationReport) => ({
  type: SEATS_UTILIZATION_REPORT_SUCCESS,
  seatsUtilizationReport: seatsUtilizationReport,
})

export const getClientHeadcountReport = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(headcountReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "headcount_report/premierHeadcount", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(clientHeadcountReportSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getClientWiseHeadcountReport = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(headcountReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "headcount_report/clientHeadcountReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(clientWiseHeadcountReportSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getSeatsUtilizationReport = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(seatsUtilizationReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "seatsUtilization_report/seatsUtilizationReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(seatsUtilizationReportSuccess(response.data))
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
      dispatch(headcountReportFailure(err))
    }
  }
  catch (e) {
    dispatch(headcountReportFailure('Unable to perform action.Something went wrong'))
  }
}   