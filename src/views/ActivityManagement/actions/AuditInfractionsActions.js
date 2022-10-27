import axios from 'axios';
import { API_URL } from 'configs'

export const INFRACTIONS_REQUEST = 'INFRACTIONS_REQUEST'
export const INFRACTIONS_SUCCESS = 'INFRACTIONS_SUCCESS'
export const INFRACTIONS_VALIDATION_ERROR = 'INFRACTIONS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_INFRACTIONS_FEILD_VALIDATION_ERROR = "HIDE_INFRACTIONS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_INFRACTIONS_LIST = 'REDIRECT_TO_INFRACTIONS_LIST'
export const INFRACTIONS_GET_SUCCESS = 'INFRACTIONS_GET_SUCCESS'
export const INFRACTIONS_SERVER_SUCCESS = 'INFRACTIONS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const infractionsRequest = () => ({
  type: INFRACTIONS_REQUEST,
})

export const infractionsServerListSuccess = () => ({
  type: INFRACTIONS_SERVER_SUCCESS,
})

const infractionsListSuccess = infractionsList => ({
  type: INFRACTIONS_SUCCESS,
  infractionsList: infractionsList,
})

const infractionsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: INFRACTIONS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const infractionsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(infractionsSuccessNotification(message))
  dispatch(redirectToInfractionsList())
}

export const redirectToInfractionsList = () => ({
  type: REDIRECT_TO_INFRACTIONS_LIST,
})

const getInfractionsSuccess = (response, action) => ({
  type: INFRACTIONS_GET_SUCCESS,
  record: response,
  actionType: action
})

const infractionsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideInfractionsValidationError = (feild_key) => ({
  type: HIDE_INFRACTIONS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const infractionsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(infractionsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_infractions/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(infractionsListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const addInfractions = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(infractionsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_infractions/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        infractionsAddUpadteSuccess('Infractions Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateInfractions = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(infractionsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_infractions/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        infractionsAddUpadteSuccess('Infractions Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getInfractionsById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(infractionsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_infractions/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getInfractionsSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteInfractions = (infractionsId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(infractionsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_infractions/delete/" + infractionsId, {
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
        dispatch(infractionsSuccessNotification('Infractions deleted successfully'))
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
      dispatch(infractionsFailure(err))
    }
  }
  catch (e) {
    dispatch(infractionsFailure('Unable to perform action.Something went wrong'))
  }
}   