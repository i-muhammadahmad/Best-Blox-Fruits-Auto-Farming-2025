import axios from 'axios';
import { API_URL } from 'configs'

export const CLIENT_REQUEST = 'CLIENT_REQUEST'
export const CLIENT_SUCCESS = 'CLIENT_SUCCESS'
export const CLIENT_VALIDATION_ERROR = 'CLIENT_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_CLIENT_FEILD_VALIDATION_ERROR = "HIDE_CLIENT_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_CLIENT_LIST = 'REDIRECT_TO_CLIENT_LIST'
export const CLIENT_GET_SUCCESS = 'CLIENT_GET_SUCCESS'
export const CLIENT_MANAGER_SUCCESS = 'CLIENT_MANAGER_SUCCESS'
export const CLIENT_INTERFACE_OFFICES_LIST_SUCCESS = 'CLIENT_INTERFACE_OFFICES_LIST_SUCCESS'
export const ADD_REMOVE_OFFICES = 'ADD_REMOVE_OFFICES';
export const CLIENT_BY_OFFICES_SUCCESS = 'CLIENT_BY_OFFICES_SUCCESS'
export const CLIENT_DROPDOWN_LIST_SUCCESS = 'CLIENT_DROPDOWN_LIST_SUCCESS'
export const CLIENT_SERVER_SUCCESS = 'CLIENT_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const clientRequest = () => ({
  type: CLIENT_REQUEST,
})

export const clientServerListSuccess = () => ({
  type: CLIENT_SERVER_SUCCESS,
})

const clientListSuccess = clientList => ({
  type: CLIENT_SUCCESS,
  clientList: clientList,
})

const clientByOfficesListSuccess = clientByOfficesList => ({
  type: CLIENT_BY_OFFICES_SUCCESS,
  clientByOfficesList: clientByOfficesList,
})

const clientManagerListSuccess = clientManagerList => ({
  type: CLIENT_MANAGER_SUCCESS,
  clientManagerList: clientManagerList,
})

const getOfficesSuccess = offices => ({
  type: CLIENT_INTERFACE_OFFICES_LIST_SUCCESS,
  offices: offices,
})

const clientFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const validationError = notification => ({
  type: CLIENT_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const clientAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(clientSuccessNotification(message))
  dispatch(redirectToClientList())
}

export const redirectToClientList = () => ({
  type: REDIRECT_TO_CLIENT_LIST,
})

const getClientSuccess = (response, action) => ({
  type: CLIENT_GET_SUCCESS,
  record: response,
  actionType: action
})

const clientSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const addRemoveOffices = (a_offices, added_offices, removed_offices = []) => ({
  type: ADD_REMOVE_OFFICES,
  a_offices: a_offices,
  added_offices: added_offices,
  removed_offices: removed_offices,
})

export const hideClientValidationError = (feild_key) => ({
  type: HIDE_CLIENT_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

/*
* client dropdown list fetch methods
*/
const clientDropdownListSuccess = clientDropdownList => ({
  type: CLIENT_DROPDOWN_LIST_SUCCESS,
  clientDropdownList: clientDropdownList,
})

export const clientDropdownListFetch = (offices_ids, employees_Ids, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        offices_ids: offices_ids,
        employees_Ids: employees_Ids,
        object_viewed_id: object_viewed_id
      }
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(clientDropdownListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const clientListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/getAll", {
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
        dispatch(clientListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const getClientsByOffices = (offices_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/getByOffices", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        offices_id,
        object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(clientByOfficesListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const getAvailableOffices = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/getAllForClient", {
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
        dispatch(getOfficesSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const clientManagerListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employees/getAll", {
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
        dispatch(clientManagerListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addClient = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/create", {
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
        clientAddUpadteSuccess('Client Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateClient = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/update/" + data.get('id'), {
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
        clientAddUpadteSuccess('Client Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getClientById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getClientSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteClient = (clientId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(clientRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "client/delete/" + clientId, {
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
        dispatch(clientSuccessNotification('Client deleted successfully'))
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
      dispatch(clientFailure(err))
    }
  }
  catch (e) {
    dispatch(clientFailure('Unable to perform action.Something went wrong'))
  }
}   
