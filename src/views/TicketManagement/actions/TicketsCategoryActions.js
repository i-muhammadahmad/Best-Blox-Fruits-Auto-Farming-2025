import axios from 'axios';
import { API_URL } from 'configs'

export const TICKETS_CATEGORY_REQUEST = 'TICKETS_CATEGORY_REQUEST'
export const TICKETS_CATEGORY_SUCCESS = 'TICKETS_CATEGORY_SUCCESS'
export const TICKETS_CATEGORY_BY_ATTR_SUCCESS = 'TICKETS_CATEGORY_BY_ATTR_SUCCESS'
export const TICKETS_CATEGORY_VALIDATION_ERROR = 'TICKETS_CATEGORY_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_TICKETS_CATEGORY_FEILD_VALIDATION_ERROR = "HIDE_TICKETS_CATEGORY_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_TICKETS_CATEGORY_LIST = 'REDIRECT_TO_TICKETS_CATEGORY_LIST'
export const TICKETS_CATEGORY_PARENT_SUCCESS = 'TICKETS_CATEGORY_PARENT_SUCCESS'
export const TICKETS_CATEGORY_GET_SUCCESS = 'TICKETS_CATEGORY_GET_SUCCESS'
export const TICKETS_CATEGORY_DROPDOWN_LIST_SUCCESS = 'TICKETS_CATEGORY_DROPDOWN_LIST_SUCCESS'
export const TICKETS_CATEGORY_SERVER_SUCCESS = 'TICKETS_CATEGORY_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const ticketsCategoryRequest = () => ({
  type: TICKETS_CATEGORY_REQUEST,
})

export const ticketsCategoryServerListSuccess = () => ({
  type: TICKETS_CATEGORY_SERVER_SUCCESS,
})

const ticketsCategoryListSuccess = ticketsCategoryList => ({
  type: TICKETS_CATEGORY_SUCCESS,
  ticketsCategoryList: ticketsCategoryList,
})

const ticketsCategoryParentListSuccess = ticketsCategoryParentsList => ({
  type: TICKETS_CATEGORY_PARENT_SUCCESS,
  ticketsCategoryParentsList: ticketsCategoryParentsList,
})

const ticketsCategoryFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: TICKETS_CATEGORY_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const ticketsCategoryAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(ticketsCategorySuccessNotification(message))
  dispatch(redirectToTicketsCategoryList())
}

export const redirectToTicketsCategoryList = () => ({
  type: REDIRECT_TO_TICKETS_CATEGORY_LIST,
})

const getTicketsCategorySuccess = (response, action) => ({
  type: TICKETS_CATEGORY_GET_SUCCESS,
  record: response,
  actionType: action
})

const ticketsCategorySuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideTicketsCategoryValidationError = (feild_key) => ({
  type: HIDE_TICKETS_CATEGORY_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

const ticketsCategoryByAttrListSuccess = ticketsCategoryByAttrList => ({
  type: TICKETS_CATEGORY_BY_ATTR_SUCCESS,
  ticketsCategoryByAttrList: ticketsCategoryByAttrList,
})

/*
* Tickets Category dropdown list fetch methods
*/
const ticketsCategoryDropdownListSuccess = ticketsCategoryDropdownList => ({
  type: TICKETS_CATEGORY_DROPDOWN_LIST_SUCCESS,
  ticketsCategoryDropdownList: ticketsCategoryDropdownList,
})

export const ticketsCategoryDropdownListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/getAllForDropdown", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(ticketsCategoryDropdownListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}


export const ticketsCategoryByAttrListFetch = (object_viewed_id = '', request_data = []) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        request_data: request_data,
        object_viewed_id: object_viewed_id
      },
    })
      .then((response) => {
        dispatch(ticketsCategoryByAttrListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const ticketsCategoryListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(ticketsCategoryListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const addTicketsCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        ticketsCategoryAddUpadteSuccess('Ticket Category Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateTicketsCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        ticketsCategoryAddUpadteSuccess('Ticket Category Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getTicketsCategoryById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getTicketsCategorySuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteTicketsCategory = (ticketsCategoryId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(ticketsCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "tickets_category/delete/" + ticketsCategoryId, {
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
        dispatch(ticketsCategorySuccessNotification('Ticket category deleted successfully'))
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
      dispatch(ticketsCategoryFailure(err))
    }
  }
  catch (e) {
    dispatch(ticketsCategoryFailure('Unable to perform action.Something went wrong'))
  }
}   