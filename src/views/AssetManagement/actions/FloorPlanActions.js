import axios from 'axios';
import { API_URL } from 'configs'

export const FLOOR_PLAN_REQUEST = 'FLOOR_PLAN_REQUEST'
export const FLOOR_PLAN_SUCCESS = 'FLOOR_PLAN_SUCCESS'
export const EMPLOYEE_DETAILS_SUCCESS = 'EMPLOYEE_DETAILS_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const floorPlanRequest = () => ({
  type: FLOOR_PLAN_REQUEST,
})

const floorPlanSuccess = floorPlan => ({
  type: FLOOR_PLAN_SUCCESS,
  floorPlan: floorPlan,
})

const employeeDetailsSuccess = empDetails => ({
  type: EMPLOYEE_DETAILS_SUCCESS,
  empDetails: empDetails,
})

const floorPlanFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const getFloorPlan = (filters) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(floorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "floorplanReport/rendederFloorPlan", {
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
        dispatch(floorPlanSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getEmployeeDetails = (emp_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(floorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "floorplanReport/getEmployeeDetails", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {employee_id: emp_id}
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(employeeDetailsSuccess(response.data))
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
      // dispatch(validationError(error.response.data.error))
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
      dispatch(floorPlanFailure(err))
    }
  }
  catch (e) {
    dispatch(floorPlanFailure('Unable to perform action.Something went wrong'))
  }
}   