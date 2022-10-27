import axios from 'axios';
import { API_URL } from 'configs'

export const CONTACT_BOARD_REQUEST = 'CONTACT_BOARD_REQUEST'
export const CONTACT_BOARD_SUCCESS = 'CONTACT_BOARD_SUCCESS'
export const CONTACT_BOARD_VALIDATION_ERROR = 'CONTACT_BOARD_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_CONTACT_BOARD_FEILD_VALIDATION_ERROR = "HIDE_CONTACT_BOARD_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_CONTACT_BOARD_LIST = 'REDIRECT_TO_CONTACT_BOARD_LIST'
export const CONTACT_BOARD_GET_SUCCESS = 'CONTACT_BOARD_GET_SUCCESS'
export const CONTACT_BOARD_SERVER_SUCCESS = 'CONTACT_BOARD_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const contactBoardRequest = () => ({
  type: CONTACT_BOARD_REQUEST,
})

export const contactBoardServerListSuccess = () => ({
  type: CONTACT_BOARD_SERVER_SUCCESS,
})

const contactBoardListSuccess = contactBoardList => ({
  type: CONTACT_BOARD_SUCCESS,
  contactBoardList: contactBoardList,
})

const contactBoardFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: CONTACT_BOARD_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const contactBoardAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(contactBoardSuccessNotification(message))
  dispatch(redirectToContactBoardList())
}

export const redirectToContactBoardList = () => ({
  type: REDIRECT_TO_CONTACT_BOARD_LIST,
})

const getContactBoardSuccess = (response, action) => ({
  type: CONTACT_BOARD_GET_SUCCESS,
  record: response,
  actionType: action
})

const contactBoardSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideContactBoardValidationError = (feild_key) => ({
  type: HIDE_CONTACT_BOARD_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const contactBoardListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(contactBoardRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "contact_board/getAll", {
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
        dispatch(contactBoardListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addContactBoard = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(contactBoardRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "contact_board/create", {
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
        contactBoardAddUpadteSuccess('Contact Board Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateContactBoard = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(contactBoardRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "contact_board/update/" + data.id, {
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
        contactBoardAddUpadteSuccess('Contact Board Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getContactBoardById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(contactBoardRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "contact_board/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getContactBoardSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteContactBoard = (contactBoardId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(contactBoardRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "contact_board/delete/" + contactBoardId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data:{
        object_viewed_id
      }
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(contactBoardSuccessNotification('Contact Board deleted successfully'))
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
      dispatch(contactBoardFailure(err))
    }
  }
  catch (e) {
    dispatch(contactBoardFailure('Unable to perform action.Something went wrong'))
  }
}   