import axios from 'axios';
import { API_URL } from 'configs'

export const SETUP_FLOOR_PLAN_REQUEST = 'SETUP_FLOOR_PLAN_REQUEST'
export const SETUP_FLOOR_PLAN_SUCCESS = 'SETUP_FLOOR_PLAN_SUCCESS'
export const SETUP_FLOOR_PLAN_VALIDATION_ERROR = 'SETUP_FLOOR_PLAN_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SETUP_FLOOR_PLAN_FEILD_VALIDATION_ERROR = "HIDE_SETUP_FLOOR_PLAN_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_SETUP_FLOOR_PLAN_LIST = 'REDIRECT_TO_SETUP_FLOOR_PLAN_LIST'
export const SETUP_FLOOR_PLAN_GET_SUCCESS = 'SETUP_FLOOR_PLAN_GET_SUCCESS'
export const SETUP_FLOOR_PLAN_SERVER_SUCCESS = 'SETUP_FLOOR_PLAN_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const setupFloorPlanRequest = () => ({
  type: SETUP_FLOOR_PLAN_REQUEST,
})

export const setupFloorPlanServerListSuccess = () => ({
  type: SETUP_FLOOR_PLAN_SERVER_SUCCESS,
})

const setupFloorPlanListSuccess = setupFloorPlanList => ({
  type: SETUP_FLOOR_PLAN_SUCCESS,
  setupFloorPlanList: setupFloorPlanList,
})

const setupFloorPlanFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: SETUP_FLOOR_PLAN_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const setupFloorPlanAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(setupFloorPlanSuccessNotification(message))
  dispatch(redirectToSetupFloorPlanList())
}

export const redirectToSetupFloorPlanList = () => ({
  type: REDIRECT_TO_SETUP_FLOOR_PLAN_LIST,
})

const getSetupFloorPlanSuccess = (response, action) => ({
  type: SETUP_FLOOR_PLAN_GET_SUCCESS,
  record: response,
  actionType: action
})

const setupFloorPlanSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideSetupFloorPlanValidationError = (feild_key) => ({
  type: HIDE_SETUP_FLOOR_PLAN_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const setupFloorPlanListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(setupFloorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "setupFloorPlan/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'object_viewed_id': object_viewed_id
      }
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(setupFloorPlanListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const addSetupFloorPlan = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(setupFloorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "setupFloorPlan/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        setupFloorPlanAddUpadteSuccess('Setup Floor Plan Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateSetupFloorPlan = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(setupFloorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "setupFloorPlan/update/" + data.get('id'), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        setupFloorPlanAddUpadteSuccess('Setup Floor Plan Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getSetupFloorPlanById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(setupFloorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "setupFloorPlan/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: {
        'object_viewed_id': object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getSetupFloorPlanSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteSetupFloorPlan = (setupFloorPlanId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(setupFloorPlanRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "setupFloorPlan/delete/" + setupFloorPlanId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'object_viewed_id': object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(setupFloorPlanSuccessNotification('Setup Floor Plan deleted successfully'))
        dispatch(setupFloorPlanListFetch())
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
      dispatch(validationError(error.response.data.error))
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
      dispatch(setupFloorPlanFailure(err))
    }
  }
  catch (e) {
    dispatch(setupFloorPlanFailure('Unable to perform action.Something went wrong'))
  }
}   