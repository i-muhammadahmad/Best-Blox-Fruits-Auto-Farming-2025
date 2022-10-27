import axios from 'axios';
import { API_URL } from 'configs'

export const LEAVE_TYPE_REQUEST = 'LEAVE_TYPE_REQUEST'
export const LEAVE_TYPE_SUCCESS = 'LEAVE_TYPE_SUCCESS'
export const LEAVE_TYPE_VALIDATION_ERROR = 'LEAVE_TYPE_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_LEAVE_TYPE_FEILD_VALIDATION_ERROR = "HIDE_LEAVE_TYPE_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_LEAVE_TYPE_LIST = 'REDIRECT_TO_LEAVE_TYPE_LIST'
export const LEAVE_TYPE_GET_SUCCESS = 'LEAVE_TYPE_GET_SUCCESS'
export const LEAVE_TYPE_SERVER_SUCCESS = 'LEAVE_TYPE_SERVER_SUCCESS'
export const LEAVE_TYPE_DROPDOWN_LIST_SUCCESS = 'LEAVE_TYPE_DROPDOWN_LIST_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const leaveTypeRequest = () => ({
  type: LEAVE_TYPE_REQUEST,
})

export const leaveTypeServerListSuccess = () => ({
  type: LEAVE_TYPE_SERVER_SUCCESS
})

const leaveTypeListSuccess = leaveTypeList => ({
  type: LEAVE_TYPE_SUCCESS,
  leaveTypeList: leaveTypeList,
})

const leaveTypeFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: LEAVE_TYPE_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const leaveTypeAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(leaveTypeSuccessNotification(message))
  dispatch(redirectToLeaveTypeList())
}

export const redirectToLeaveTypeList = () => ({
  type: REDIRECT_TO_LEAVE_TYPE_LIST,
})

const getLeaveTypeSuccess = (response, action) => ({
  type: LEAVE_TYPE_GET_SUCCESS,
  record: response,
  actionType: action
})

const leaveTypeSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideLeaveTypeValidationError = (feild_key) => ({
  type: HIDE_LEAVE_TYPE_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

/*
* leave type dropdown list fetch methods
*/
const leaveTypeDropdownListSuccess = leaveTypeDropdownList => ({
  type: LEAVE_TYPE_DROPDOWN_LIST_SUCCESS,
  leaveTypeDropdownList: leaveTypeDropdownList,
})

export const leaveTypeDropdownListFetch = (offices_ids) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        offices_ids: offices_ids
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(leaveTypeDropdownListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const leaveTypeListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(leaveTypeListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addLeaveType = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/create", {
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
        leaveTypeAddUpadteSuccess('Leave Type Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateLeaveType = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/update/" + data.id, {
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
        leaveTypeAddUpadteSuccess('Leave Type Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getLeaveTypeById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getLeaveTypeSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteLeaveType = (leaveTypeId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveTypeRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leave_type/delete/" + leaveTypeId, {
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
        dispatch(hideCommonLoader())
        dispatch(leaveTypeSuccessNotification('Leave Type deleted successfully'))
        dispatch(leaveTypeListFetch())
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
      dispatch(leaveTypeFailure(err))
    }
  }
  catch (e) {
    dispatch(leaveTypeFailure('Unable to perform action.Something went wrong'))
  }
}   