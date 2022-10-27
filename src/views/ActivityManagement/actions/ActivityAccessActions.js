import axios from 'axios';
import { API_URL } from 'configs'

export const ACTIVITY_ACCESS_REQUEST = 'ACTIVITY_ACCESS_REQUEST'
export const ACTIVITY_ACCESS_SUCCESS = 'ACTIVITY_ACCESS_SUCCESS'
export const ACTIVITY_ACCESS_VALIDATION_ERROR = 'ACTIVITY_ACCESS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ACTIVITY_ACCESS_FEILD_VALIDATION_ERROR = "HIDE_ACTIVITY_ACCESS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ACTIVITY_ACCESS_LIST = 'REDIRECT_TO_ACTIVITY_ACCESS_LIST'
export const ACTIVITY_ACCESS_ROLE_SUCCESS = 'ACTIVITY_ACCESS_ROLE_SUCCESS'
export const ACTIVITY_ACCESS_GET_SUCCESS = 'ACTIVITY_ACCESS_GET_SUCCESS'
export const ACTIVITY_ACCESS_SERVER_SUCCESS = 'ACTIVITY_ACCESS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const activityAccessRequest = () => ({
  type: ACTIVITY_ACCESS_REQUEST,
})

export const activityAccessServerListSuccess = () => ({
  type: ACTIVITY_ACCESS_SERVER_SUCCESS,
})

const activityAccessListSuccess = activityAccessList => ({
  type: ACTIVITY_ACCESS_SUCCESS,
  activityAccessList: activityAccessList,
})

const activityAccessRoleListSuccess = activityAccessRolesList => ({
  type: ACTIVITY_ACCESS_ROLE_SUCCESS,
  activityAccessRolesList: activityAccessRolesList,
})

const activityAccessFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: ACTIVITY_ACCESS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const activityAccessAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(activityAccessSuccessNotification(message))
  dispatch(redirectToActivityAccessList())
}

export const redirectToActivityAccessList = () => ({
  type: REDIRECT_TO_ACTIVITY_ACCESS_LIST,
})

const getActivityAccessSuccess = (response, action) => ({
  type: ACTIVITY_ACCESS_GET_SUCCESS,
  record: response,
  actionType: action
})

const activityAccessSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideActivityAccessValidationError = (feild_key) => ({
  type: HIDE_ACTIVITY_ACCESS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const activityAccessListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_access/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(activityAccessListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const activityAccessRoleListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "roles/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(activityAccessRoleListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addActivityAccess = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_access/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        activityAccessAddUpadteSuccess('Activity Access Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateActivityAccess = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_access/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        activityAccessAddUpadteSuccess('Activity Access Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getActivityAccessById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_access/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getActivityAccessSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteActivityAccess = (activityAccessId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_access/delete/" + activityAccessId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id
      }
    })
      .then((response) => {
        dispatch(activityAccessSuccessNotification('Activity Access deleted successfully'))
        dispatch(activityAccessListFetch())
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
      dispatch(activityAccessFailure(err))
    }
  }
  catch (e) {
    dispatch(activityAccessFailure('Unable to perform action.Something went wrong'))
  }
}   