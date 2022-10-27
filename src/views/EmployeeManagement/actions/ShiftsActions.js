import axios from 'axios';
import { API_URL } from 'configs'

export const SHIFTS_REQUEST = 'SHIFTS_REQUEST'
export const SHIFTS_SUCCESS = 'SHIFTS_SUCCESS'
export const SHIFTS_VALIDATION_ERROR = 'SHIFTS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SHIFTS_FEILD_VALIDATION_ERROR = "HIDE_SHIFTS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_SHIFTS_LIST = 'REDIRECT_TO_SHIFTS_LIST'
export const SHIFTS_GET_SUCCESS = 'SHIFTS_GET_SUCCESS'
export const SHIFTS_BY_CLIENT_LIST_SUCCESS = 'SHIFTS_BY_CLIENT_LIST_SUCCESS'
export const SHIFTS_SERVER_SUCCESS = 'SHIFTS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const shiftsRequest = () => ({
  type: SHIFTS_REQUEST,
})

export const shiftsServerListSuccess = () => ({
  type: SHIFTS_SERVER_SUCCESS
})

const shiftsListSuccess = shiftsList => ({
  type: SHIFTS_SUCCESS,
  shiftsList: shiftsList,
})

const shiftsByClientListSuccess = shiftsByClientList => ({
  type: SHIFTS_BY_CLIENT_LIST_SUCCESS,
  shiftsByClientList: shiftsByClientList,
})


const shiftsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: SHIFTS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const shiftsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(shiftsSuccessNotification(message))
  dispatch(redirectToShiftsList())
}

export const redirectToShiftsList = () => ({
  type: REDIRECT_TO_SHIFTS_LIST,
})

const getShiftsSuccess = (response, action) => ({
  type: SHIFTS_GET_SUCCESS,
  record: response,
  actionType: action
})

const shiftsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideShiftsValidationError = (feild_key) => ({
  type: HIDE_SHIFTS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const shiftsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(shiftsListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getShiftsByClient = (client_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token");
  let request_data = [
    {
      'key': 'client_id',
      'value': client_id
    }
  ];
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        request_data: request_data,
        object_viewed_id: object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(shiftsByClientListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const addShifts = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/create", {
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
        shiftsAddUpadteSuccess('Shift Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateShifts = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/update/" + data.id, {
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
        shiftsAddUpadteSuccess('Shift Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getShiftsById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getShiftsSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteShifts = (shiftsId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(shiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "shifts/delete/" + shiftsId, {
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
        dispatch(shiftsSuccessNotification('Shift deleted successfully'))
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
      dispatch(shiftsFailure(err))
    }
  }
  catch (e) {
    dispatch(shiftsFailure('Unable to perform action.Something went wrong'))
  }
}  

export const copyShiftData = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    return axios(API_URL + "shifts/copyshiftdata", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}