import axios from 'axios';
import { API_URL } from 'configs'

export const WORKSTATIONS_REQUEST = 'WORKSTATIONS_REQUEST'
export const WORKSTATIONS_SUCCESS = 'WORKSTATIONS_SUCCESS'
export const WORKSTATIONS_VALIDATION_ERROR = 'WORKSTATIONS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_WORKSTATIONS_FEILD_VALIDATION_ERROR = "HIDE_WORKSTATIONS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_WORKSTATIONS_LIST = 'REDIRECT_TO_WORKSTATIONS_LIST'
export const WORKSTATIONS_GET_SUCCESS = 'WORKSTATIONS_GET_SUCCESS'
export const WORKSTATIONS_BY_OFFFICE_SUCCESS = 'WORKSTATIONS_BY_OFFFICE_SUCCESS'
export const WORKSTATIONS_SERVER_SUCCESS = 'WORKSTATIONS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const workstationsRequest = () => ({
  type: WORKSTATIONS_REQUEST,
})

export const workstationsServerListSuccess = () => ({
  type: WORKSTATIONS_SERVER_SUCCESS,
})

const workstationsListSuccess = workstationsList => ({
  type: WORKSTATIONS_SUCCESS,
  workstationsList: workstationsList,
})

const workstationsByOfficesSuccess = workstationsByOfficeList => ({
  type: WORKSTATIONS_BY_OFFFICE_SUCCESS,
  workstationsByOfficeList: workstationsByOfficeList,
})

const workstationsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: WORKSTATIONS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const workstationsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(workstationsSuccessNotification(message))
  dispatch(redirectToWorkstationsList())
}

export const redirectToWorkstationsList = () => ({
  type: REDIRECT_TO_WORKSTATIONS_LIST,
})

const getWorkstationsSuccess = (response, action) => ({
  type: WORKSTATIONS_GET_SUCCESS,
  record: response,
  actionType: action
})

const workstationsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideWorkstationsValidationError = (feild_key) => ({
  type: HIDE_WORKSTATIONS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const workstationsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/getAll", {
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
        dispatch(workstationsListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const workstationsByOfficesListFetch = (office_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        office_id: office_id,
        object_viewed_id: object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(workstationsByOfficesSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addWorkstations = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/create", {
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
        workstationsAddUpadteSuccess('Workstation Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateWorkstations = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/update/" + data.id, {
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
        workstationsAddUpadteSuccess('Workstation Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getWorkstationsById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/getById/" + id, {
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
        dispatch(getWorkstationsSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteWorkstations = (workstationsId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(workstationsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "workstations/delete/" + workstationsId, {
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
        dispatch(workstationsSuccessNotification('Workstation deleted successfully'))
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
      dispatch(workstationsFailure(err))
    }
  }
  catch (e) {
    dispatch(workstationsFailure('Unable to perform action.Something went wrong'))
  }
}   