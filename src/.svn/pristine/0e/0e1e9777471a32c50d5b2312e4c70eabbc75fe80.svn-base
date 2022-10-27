import axios from 'axios';
import { API_URL } from 'configs'

export const EMAIL_TEMPLATES_REQUEST = 'EMAIL_TEMPLATES_REQUEST'
export const EMAIL_TEMPLATES_SUCCESS = 'EMAIL_TEMPLATES_SUCCESS'
export const EMAIL_TEMPLATES_VALIDATION_ERROR = 'EMAIL_TEMPLATES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_EMAIL_TEMPLATES_FEILD_VALIDATION_ERROR = "HIDE_EMAIL_TEMPLATES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_EMAIL_TEMPLATES_LIST = 'REDIRECT_TO_EMAIL_TEMPLATES_LIST'
export const EMAIL_TEMPLATES_GET_SUCCESS = 'EMAIL_TEMPLATES_GET_SUCCESS'
export const EMAIL_TEMPLATES_SERVER_SUCCESS = 'EMAIL_TEMPLATES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const emailTemplatesRequest = () => ({
  type: EMAIL_TEMPLATES_REQUEST,
})

export const emailTemplatesServerListSuccess = () => ({
  type: EMAIL_TEMPLATES_SERVER_SUCCESS,
})

const emailTemplatesListSuccess = emailTemplatesList => ({
  type: EMAIL_TEMPLATES_SUCCESS,
  emailTemplatesList: emailTemplatesList,
})

const emailTemplatesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: EMAIL_TEMPLATES_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const emailTemplatesAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(emailTemplatesSuccessNotification(message))
  dispatch(redirectToEmailTemplatesList())
}

export const redirectToEmailTemplatesList = () => ({
  type: REDIRECT_TO_EMAIL_TEMPLATES_LIST,
})

const getEmailTemplatesSuccess = (response, action) => ({
  type: EMAIL_TEMPLATES_GET_SUCCESS,
  record: response,
  actionType: action
})

const emailTemplatesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideEmailTemplatesValidationError = (feild_key) => ({
  type: HIDE_EMAIL_TEMPLATES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const emailTemplatesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(emailTemplatesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "email_templates/getAll", {
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
        dispatch(emailTemplatesListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addEmailTemplates = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(emailTemplatesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "email_templates/create", {
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
        emailTemplatesAddUpadteSuccess('Email Template Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateEmailTemplates = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(emailTemplatesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "email_templates/update/" + data.get('id'), {
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
        emailTemplatesAddUpadteSuccess('Email Template Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getEmailTemplatesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(emailTemplatesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "email_templates/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getEmailTemplatesSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteEmailTemplates = (emailTemplatesId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(emailTemplatesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "email_templates/delete/" + emailTemplatesId, {
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
        dispatch(emailTemplatesSuccessNotification('Email Template deleted successfully'))
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
      dispatch(emailTemplatesFailure(err))
    }
  }
  catch (e) {
    dispatch(emailTemplatesFailure('Unable to perform action.Something went wrong'))
  }
}   