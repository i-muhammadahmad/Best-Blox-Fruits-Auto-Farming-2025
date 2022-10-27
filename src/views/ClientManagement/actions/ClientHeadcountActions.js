import axios from 'axios';
import { API_URL } from 'configs'

export const CLIENT_HEADCOUNT_REQUEST = 'CLIENT_HEADCOUNT_REQUEST'
export const CLIENT_HEADCOUNT_SUCCESS = 'CLIENT_HEADCOUNT_SUCCESS'
export const CLIENT_HEADCOUNT_VALIDATION_ERROR = 'CLIENT_HEADCOUNT_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_CLIENT_HEADCOUNT_FEILD_VALIDATION_ERROR = "HIDE_CLIENT_HEADCOUNT_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_CLIENT_HEADCOUNT_LIST = 'REDIRECT_TO_CLIENT_HEADCOUNT_LIST'
export const CLIENT_HEADCOUNT_GET_SUCCESS = 'CLIENT_HEADCOUNT_GET_SUCCESS'
export const CLIENT_HEADCOUNT_SERVER_SUCCESS = 'CLIENT_HEADCOUNT_SERVER_SUCCESS'
export const CLIENT_HEADCOUNT_DROPDOWN_SUCCESS = 'CLIENT_HEADCOUNT_DROPDOWN_SUCCESS'
export const CLIENT_HEADCOUNT_CHECKPOINT_SUCCESS = 'CLIENT_HEADCOUNT_CHECKPOINT_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const clientHeadcountRequest = () => ({
  type: CLIENT_HEADCOUNT_REQUEST,
})

export const clientHeadcountServerListSuccess = () => ({
  type: CLIENT_HEADCOUNT_SERVER_SUCCESS
})

const clientHeadcountListSuccess = clientHeadcountList => ({
  type: CLIENT_HEADCOUNT_SUCCESS,
  clientHeadcountList: clientHeadcountList,
})

const clientHeadcountDropdownListSuccess = clientHeadcountDropdownList => ({
  type: CLIENT_HEADCOUNT_DROPDOWN_SUCCESS,
  clientHeadcountDropdownList: clientHeadcountDropdownList,
})

const clientHeadcountCheckpointsListSuccess = clientHeadcountCheckpointsList => ({
  type: CLIENT_HEADCOUNT_CHECKPOINT_SUCCESS,
  clientHeadcountCheckpointsList: clientHeadcountCheckpointsList,
})

const clientHeadcountFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: CLIENT_HEADCOUNT_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const clientHeadcountAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(clientHeadcountSuccessNotification(message))
  dispatch(redirectToClientHeadcountList())
}

export const redirectToClientHeadcountList = () => ({
  type: REDIRECT_TO_CLIENT_HEADCOUNT_LIST,
})

const getClientHeadcountSuccess = (response, action) => ({
  type: CLIENT_HEADCOUNT_GET_SUCCESS,
  record: response,
  actionType: action
})

const clientHeadcountSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideClientHeadcountValidationError = (feild_key) => ({
  type: HIDE_CLIENT_HEADCOUNT_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const clientHeadcountDropdownListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id: object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(clientHeadcountDropdownListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const clientHeadcountCheckpointsListFetch = (client_headcount_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/getAllCheckpoints", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        client_headcount_id: client_headcount_id,
        object_viewed_id: object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(clientHeadcountCheckpointsListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const clientHeadcountListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/getAll", {
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
        dispatch(clientHeadcountListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const addClientHeadcount = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/create", {
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
        clientHeadcountAddUpadteSuccess('Client Headcount Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const updateClientHeadcount = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/update/" + data.id, {
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
        clientHeadcountAddUpadteSuccess('Client Headcount Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getClientHeadcountById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getClientHeadcountSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteClientHeadcount = (clientHeadcountId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientHeadcountRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client_headcount/delete/" + clientHeadcountId, {
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
        dispatch(clientHeadcountSuccessNotification('Client Headcount deleted successfully'))
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
      dispatch(clientHeadcountFailure(err))
    }
  }
  catch (e) {
    dispatch(clientHeadcountFailure('Unable to perform action.Something went wrong'))
  }
}   