import axios from 'axios';
import { API_URL } from 'configs'

export const OBJECT_TYPES_REQUEST = 'OBJECT_TYPES_REQUEST'
export const OBJECT_TYPES_SUCCESS = 'OBJECT_TYPES_SUCCESS'
export const OBJECT_TYPES_VALIDATION_ERROR = 'OBJECT_TYPES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_OBJECT_TYPES_FEILD_VALIDATION_ERROR = "HIDE_OBJECT_TYPES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_OBJECT_TYPES_LIST = 'REDIRECT_TO_OBJECT_TYPES_LIST'
export const OBJECT_TYPES_GET_SUCCESS = 'OBJECT_TYPES_GET_SUCCESS'
export const OBJECT_TYPES_SERVER_SUCCESS = 'OBJECT_TYPES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const objectTypesRequest = () => ({
  type: OBJECT_TYPES_REQUEST,
})

export const objectTypesServerListSuccess = () => ({
  type: OBJECT_TYPES_SERVER_SUCCESS,
})

const objectTypesListSuccess = objectTypesList => ({
  type: OBJECT_TYPES_SUCCESS,
  objectTypesList: objectTypesList,
})

const objectTypesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: OBJECT_TYPES_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const objectTypesAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(objectTypesSuccessNotification(message))
  dispatch(redirectToObjectTypesList())
}

export const redirectToObjectTypesList = () => ({
  type: REDIRECT_TO_OBJECT_TYPES_LIST,
})

const getObjectTypesSuccess = (response, action) => ({
  type: OBJECT_TYPES_GET_SUCCESS,
  record: response,
  actionType: action
})

const objectTypesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideObjectTypesValidationError = (feild_key) => ({
  type: HIDE_OBJECT_TYPES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const objectTypesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(objectTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "object_types/getAll", {
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
        dispatch(objectTypesListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addObjectTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(objectTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "object_types/create", {
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
        objectTypesAddUpadteSuccess('Object Type Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateObjectTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(objectTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "object_types/update/" + data.id, {
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
        objectTypesAddUpadteSuccess('Object Type Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getObjectTypesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(objectTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "object_types/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getObjectTypesSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteObjectTypes = (objectTypesId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(objectTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "object_types/delete/" + objectTypesId, {
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
        dispatch(objectTypesSuccessNotification('Object Type deleted successfully'))
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
      dispatch(objectTypesFailure(err))
    }
  }
  catch (e) {
    dispatch(objectTypesFailure('Unable to perform action.Something went wrong'))
  }
}   