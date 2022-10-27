import axios from 'axios';
import { API_URL } from 'configs'

export const ASSETS_REPORT_REQUEST = 'ASSETS_REPORT_REQUEST'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const ASSETS_REPORT_SUCCESS = 'ASSETS_REPORT_SUCCESS'
export const ASSETS_REPORT_SERVER_SUCCESS = 'ASSETS_REPORT_SERVER_SUCCESS'
export const ASSETS_SUMMARY_REPORT_SUCCESS = 'ASSETS_SUMMARY_REPORT_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const assetsReportRequest = () => ({
  type: ASSETS_REPORT_REQUEST,
})

export const assetsReportServerSuccess = () => ({
  type: ASSETS_REPORT_SERVER_SUCCESS,
})

const assetsReportSuccess = report_data => ({
  type: ASSETS_REPORT_SUCCESS,
  report_data: report_data,
})

const assetsReportFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const getAssetsReportList = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetsReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "assets/getAssetsReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(assetsReportSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

const assetsSummaryReportSuccess = report_data => ({
  type: ASSETS_SUMMARY_REPORT_SUCCESS,
  summary_report_list: report_data.summary_report_list,
  offices_list: report_data.offices_list,
})

export const getAssetsSummaryReportList = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetsReportRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "assets/getAssetsSummaryReport", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: filters
    })
      .then((response) => {
        dispatch(assetsSummaryReportSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
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
      dispatch(assetsReportFailure(err))
    }
  }
  catch (e) {
    dispatch(assetsReportFailure('Unable to perform action.Something went wrong'))
  }
}   