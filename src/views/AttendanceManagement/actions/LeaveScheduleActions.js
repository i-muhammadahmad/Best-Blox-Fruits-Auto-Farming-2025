import axios from 'axios';
import { API_URL } from 'configs'

export const LEAVE_SCHEDULE_REQUEST = 'LEAVE_SCHEDULE_REQUEST'
export const LEAVE_SCHEDULE_SUCCESS = 'LEAVE_SCHEDULE_SUCCESS'
export const LEAVE_SCHEDULE_VALIDATION_ERROR = 'LEAVE_SCHEDULE_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_LEAVE_SCHEDULE_FEILD_VALIDATION_ERROR = "HIDE_LEAVE_SCHEDULE_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_LEAVE_SCHEDULE_LIST = 'REDIRECT_TO_LEAVE_SCHEDULE_LIST'
export const LEAVE_SCHEDULE_GET_SUCCESS = 'LEAVE_SCHEDULE_GET_SUCCESS'
export const LEAVE_SCHEDULE_SERVER_SUCCESS = 'LEAVE_SCHEDULE_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const leaveScheduleRequest = () => ({
  type: LEAVE_SCHEDULE_REQUEST,
})

export const leaveScheduleServerListSuccess = () => ({
  type: LEAVE_SCHEDULE_SERVER_SUCCESS
})

const leaveScheduleListSuccess = leaveScheduleList => ({
  type: LEAVE_SCHEDULE_SUCCESS,
  leaveScheduleList: leaveScheduleList,
})

const leaveScheduleFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: LEAVE_SCHEDULE_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const leaveScheduleAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(leaveScheduleSuccessNotification(message))
  dispatch(redirectToLeaveScheduleList())
}

export const redirectToLeaveScheduleList = () => ({
  type: REDIRECT_TO_LEAVE_SCHEDULE_LIST,
})

const getLeaveScheduleSuccess = (response, action) => ({
  type: LEAVE_SCHEDULE_GET_SUCCESS,
  record: response,
  actionType: action
})

const leaveScheduleSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideLeaveScheduleValidationError = (feild_key) => ({
  type: HIDE_LEAVE_SCHEDULE_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const leaveScheduleListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(leaveScheduleListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addLeaveSchedule = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/create", {
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
        leaveScheduleAddUpadteSuccess('Leave Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateLeaveSchedule = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/update/" + data.id, {
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
        leaveScheduleAddUpadteSuccess('Leave Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getLeaveScheduleById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getLeaveScheduleSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const submitLeave = (leaveScheduleId, object_viewed_id) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/submitLeave/" + leaveScheduleId, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'object_viewed_id': object_viewed_id,
        'id': leaveScheduleId
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(leaveScheduleSuccessNotification('Leave submitted successfully'))
        dispatch(leaveScheduleListFetch())
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const deleteLeaveSchedule = (leaveScheduleId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(leaveScheduleRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "leaves/delete/" + leaveScheduleId, {
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
        dispatch(leaveScheduleSuccessNotification('Leave deleted successfully'))
        dispatch(leaveScheduleListFetch())
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
      dispatch(leaveScheduleFailure(err))
    }
  }
  catch (e) {
    dispatch(leaveScheduleFailure('Unable to perform action.Something went wrong'))
  }
}   