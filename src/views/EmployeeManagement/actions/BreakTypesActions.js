import axios from 'axios';
import { API_URL } from 'configs'

export const BREAK_TYPES_REQUEST = 'BREAK_TYPES_REQUEST'
export const BREAK_TYPES_SUCCESS = 'BREAK_TYPES_SUCCESS'
export const BREAK_TYPES_BY_ATTR_SUCCESS = 'BREAK_TYPES_BY_ATTR_SUCCESS'
export const BREAK_TYPES_VALIDATION_ERROR = 'BREAK_TYPES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_BREAK_TYPES_FEILD_VALIDATION_ERROR = "HIDE_BREAK_TYPES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_BREAK_TYPES_LIST = 'REDIRECT_TO_BREAK_TYPES_LIST'
export const BREAK_TYPES_PARENT_SUCCESS = 'BREAK_TYPES_PARENT_SUCCESS'
export const BREAK_TYPES_GET_SUCCESS = 'BREAK_TYPES_GET_SUCCESS'
export const BREAK_TYPES_DROPDOWN_LIST_SUCCESS = 'BREAK_TYPES_DROPDOWN_LIST_SUCCESS'
export const BREAK_TYPES_SERVER_SUCCESS = 'BREAK_TYPES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const breakTypesRequest = () => ({
  type: BREAK_TYPES_REQUEST,
})

export const breakTypesServerListSuccess = () => ({
  type: BREAK_TYPES_SERVER_SUCCESS,
})

const breakTypesListSuccess = breakTypesList => ({
  type: BREAK_TYPES_SUCCESS,
  breakTypesList: breakTypesList,
})

const breakTypesParentListSuccess = breakTypesParentsList => ({
  type: BREAK_TYPES_PARENT_SUCCESS,
  breakTypesParentsList: breakTypesParentsList,
})

const breakTypesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: BREAK_TYPES_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const breakTypesAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(breakTypesSuccessNotification(message))
  dispatch(redirectToBreakTypesList())
}

export const redirectToBreakTypesList = () => ({
  type: REDIRECT_TO_BREAK_TYPES_LIST,
})

const getBreakTypesSuccess = (response, action) => ({
  type: BREAK_TYPES_GET_SUCCESS,
  record: response,
  actionType: action
})

const breakTypesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideBreakTypesValidationError = (feild_key) => ({
  type: HIDE_BREAK_TYPES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

const breakTypesByAttrListSuccess = breakTypesByAttrList => ({
  type: BREAK_TYPES_BY_ATTR_SUCCESS,
  breakTypesByAttrList: breakTypesByAttrList,
})

/*
* break types dropdown list fetch methods
*/
const breakTypesDropdownListSuccess = breakTypesDropdownList => ({
  type: BREAK_TYPES_DROPDOWN_LIST_SUCCESS,
  breakTypesDropdownList: breakTypesDropdownList,
})

export const breakTypesDropdownListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id: object_viewed_id,
      }
    })
    .then((response) => {
      dispatch(breakTypesDropdownListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const breakTypesByAttrListFetch = (request_data = [], object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/getByAttributes", {
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
        dispatch(breakTypesByAttrListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const breakTypesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(breakTypesListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const addBreakTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        breakTypesAddUpadteSuccess('Break Types Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateBreakTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        breakTypesAddUpadteSuccess('Break Types Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getBreakTypesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getBreakTypesSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteBreakTypes = (breakTypesId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(breakTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "break_types/delete/" + breakTypesId, {
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
        dispatch(breakTypesSuccessNotification('Break Types deleted successfully'))
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
      dispatch(breakTypesFailure(err))
    }
  }
  catch (e) {
    dispatch(breakTypesFailure('Unable to perform action.Something went wrong'))
  }
}   