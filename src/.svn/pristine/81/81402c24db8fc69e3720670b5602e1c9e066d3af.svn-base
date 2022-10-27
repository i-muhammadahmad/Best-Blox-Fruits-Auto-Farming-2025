import axios from 'axios';
import { API_URL } from 'configs'

export const ACTIVITY_CATEGORY_STATUS_REQUEST = 'ACTIVITY_CATEGORY_STATUS_REQUEST'
export const ACTIVITY_CATEGORY_STATUS_SUCCESS = 'ACTIVITY_CATEGORY_STATUS_SUCCESS'
export const ACTIVITY_CATEGORY_STATUS_VALIDATION_ERROR = 'ACTIVITY_CATEGORY_STATUS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ACTIVITY_CATEGORY_STATUS_FEILD_VALIDATION_ERROR = "HIDE_ACTIVITY_CATEGORY_STATUS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ACTIVITY_CATEGORY_STATUS_LIST = 'REDIRECT_TO_ACTIVITY_CATEGORY_STATUS_LIST'
export const ACTIVITY_CATEGORY_STATUS_PARENT_SUCCESS = 'ACTIVITY_CATEGORY_STATUS_PARENT_SUCCESS'
export const ACTIVITY_CATEGORY_STATUS_GET_SUCCESS = 'ACTIVITY_CATEGORY_STATUS_GET_SUCCESS'
export const ACTIVITY_CATEGORY_STATUS_SERVER_SUCCESS = 'ACTIVITY_CATEGORY_STATUS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const activityCategoryStatusRequest = () => ({
  type: ACTIVITY_CATEGORY_STATUS_REQUEST,
})

export const activityCategoryStatusServerListSuccess = () => ({
  type: ACTIVITY_CATEGORY_STATUS_SERVER_SUCCESS
})

const activityCategoryStatusListSuccess = activityCategoryStatusList => ({
  type: ACTIVITY_CATEGORY_STATUS_SUCCESS,
  activityCategoryStatusList: activityCategoryStatusList,
})

const activityCategoryStatusParentListSuccess = activityCategoryStatusParentsList => ({
  type: ACTIVITY_CATEGORY_STATUS_PARENT_SUCCESS,
  activityCategoryStatusParentsList: activityCategoryStatusParentsList,
})

const activityCategoryStatusFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: ACTIVITY_CATEGORY_STATUS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const activityCategoryStatusAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(activityCategoryStatusSuccessNotification(message))
  dispatch(redirectToActivityCategoryStatusList())
}

export const redirectToActivityCategoryStatusList = () => ({
  type: REDIRECT_TO_ACTIVITY_CATEGORY_STATUS_LIST,
})

const getActivityCategoryStatusSuccess = (response, action) => ({
  type: ACTIVITY_CATEGORY_STATUS_GET_SUCCESS,
  record: response,
  actionType: action
})

const activityCategoryStatusSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideActivityCategoryStatusValidationError = (feild_key) => ({
  type: HIDE_ACTIVITY_CATEGORY_STATUS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const activityCategoryStatusListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(activityCategoryStatusListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}


export const activityCategoryStatusParentListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/getAllParents", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(activityCategoryStatusParentListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addActivityCategoryStatus = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        activityCategoryStatusAddUpadteSuccess('Activity Category Status Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateActivityCategoryStatus = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        activityCategoryStatusAddUpadteSuccess('Activity Category Status Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getActivityCategoryStatusById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getActivityCategoryStatusSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteActivityCategoryStatus = (activityCategoryStatusId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(activityCategoryStatusRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "activity_categories_status/delete/" + activityCategoryStatusId, {
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
        dispatch(activityCategoryStatusSuccessNotification('Activity Category Status deleted successfully'))
        dispatch(activityCategoryStatusListFetch())
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
      dispatch(activityCategoryStatusFailure(err))
    }
  }
  catch (e) {
    dispatch(activityCategoryStatusFailure('Unable to perform action.Something went wrong'))
  }
}   