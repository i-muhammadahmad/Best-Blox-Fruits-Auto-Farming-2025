import axios from 'axios';
import { API_URL } from 'configs'

export const TRANSCRIBE_CONFIG_REQUEST = 'TRANSCRIBE_CONFIG_REQUEST'
export const TRANSCRIBE_CONFIG_SUCCESS = 'TRANSCRIBE_CONFIG_SUCCESS'
export const TRANSCRIBE_CONFIG_VALIDATION_ERROR = 'TRANSCRIBE_CONFIG_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_TRANSCRIBE_CONFIG_FEILD_VALIDATION_ERROR = "HIDE_TRANSCRIBE_CONFIG_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_TRANSCRIBE_CONFIG_LIST = 'REDIRECT_TO_TRANSCRIBE_CONFIG_LIST'
export const TRANSCRIBE_CONFIG_GET_SUCCESS = 'TRANSCRIBE_CONFIG_GET_SUCCESS'
export const SET_FTP_VERIFIED_TRUE = "SET_FTP_VERIFIED_TRUE"
export const TRANSCRIBE_CONFIG_SERVER_SUCCESS = 'TRANSCRIBE_CONFIG_SERVER_SUCCESS'
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const transcribeConfigRequest = () => ({
  type: TRANSCRIBE_CONFIG_REQUEST,
})

export const transcribeConfigServerListSuccess = () => ({
  type: TRANSCRIBE_CONFIG_SERVER_SUCCESS,
})

const transcribeConfigListSuccess = transcribeConfigList => ({
  type: TRANSCRIBE_CONFIG_SUCCESS,
  transcribeConfigList: transcribeConfigList,
})

const transcribeConfigFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: TRANSCRIBE_CONFIG_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const transcribeConfigAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(transcribeConfigSuccessNotification(message))
  dispatch(redirectToTranscribeConfigList())
}

const ftpVerifiedSuccess = (message, dispatch) => {
  dispatch(transcribeConfigSuccessNotification(message));
  dispatch({
    type: SET_FTP_VERIFIED_TRUE,
  })
}

export const redirectToTranscribeConfigList = () => ({
  type: REDIRECT_TO_TRANSCRIBE_CONFIG_LIST,
})

const getTranscribeConfigSuccess = (response, action) => ({
  type: TRANSCRIBE_CONFIG_GET_SUCCESS,
  record: response,
  actionType: action
})

const transcribeConfigSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideTranscribeConfigValidationError = (feild_key) => ({
  type: HIDE_TRANSCRIBE_CONFIG_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const transcribeConfigListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/getAll", {
      method: "GET",
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
        dispatch(transcribeConfigListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const verifyTranscribeConfigFTP = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/verify_ftp", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        ftpVerifiedSuccess('FTP Verified Successfully', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const addTranscribeConfig = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/create", {
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
        transcribeConfigAddUpadteSuccess('Transcribe Config Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateTranscribeConfig = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/update/" + data.id, {
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
        transcribeConfigAddUpadteSuccess('Transcribe Config Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getTranscribeConfigById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/getById/" + id, {
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
        dispatch(getTranscribeConfigSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteTranscribeConfig = (transcribeConfigId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeConfigRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_config/delete/" + transcribeConfigId, {
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
        dispatch(transcribeConfigSuccessNotification('Transcribe Config deleted successfully'))
        dispatch(transcribeConfigListFetch())
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
      dispatch(transcribeConfigFailure(err))
    }
  }
  catch (e) {
    dispatch(transcribeConfigFailure('Unable to perform action.Something went wrong'))
  }
}   