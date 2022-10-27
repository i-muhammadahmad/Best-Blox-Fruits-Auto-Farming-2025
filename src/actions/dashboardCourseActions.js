import axios from 'axios';
import { API_URL } from 'configs'
import { isEmpty } from 'lodash'

export const COURSE_DASHBOARD_REQUEST = 'COURSE_DASHBOARD_REQUEST'
export const COURSE_DASHBOARD_SUCCESS = 'COURSE_DASHBOARD_SUCCESS'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const courseDashboardRequest = () => ({
  type: COURSE_DASHBOARD_REQUEST,
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const courseDashboardFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

export const COURSE_DASHBOARD_OFFICE_SUCCESS = 'COURSE_DASHBOARD_OFFICE_SUCCESS';

const courseDashboardOfficeSuccess = responseData => ({
  type: COURSE_DASHBOARD_OFFICE_SUCCESS,
  courseDashboardOfficeSummary: responseData.office_summary
})

export const getcourseDashboardOfficeWiseSummary = (showCompliance = false) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(courseDashboardRequest())
    return axios(API_URL + "dashboard/getCourseDashboardOfficeWiseSummary", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { showCompliance }
    })
    .then((response) => {
      dispatch(courseDashboardOfficeSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const COURSE_DASHBOARD_SUMMARY_SUCCESS = 'COURSE_DASHBOARD_SUMMARY_SUCCESS';

const courseDashboardSummarySuccess = responseData => ({
  type: COURSE_DASHBOARD_SUMMARY_SUCCESS,
  courseDashboardAllSummaryHeader: responseData.theader,
  courseDashboardAllSummary: responseData.all_summary
})

export const getcourseDashboardCourseWiseSummary = (showCompliance = false) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(courseDashboardRequest())
    return axios(API_URL + "dashboard/getCourseDashboardCourseWiseSummary", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { showCompliance }
    })
    .then((response) => {
      dispatch(courseDashboardSummarySuccess(response.data))
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
      dispatch(courseDashboardFailure(err))
    }
  }
  catch (e) {
    dispatch(courseDashboardFailure('Unable to perform action.Something went wrong'))
  }
}

