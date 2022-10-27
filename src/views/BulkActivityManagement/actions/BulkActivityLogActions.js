import axios from 'axios';
import { API_URL } from 'configs'

export const BULK_ACTIVITY_LOG_REQUEST = 'BULK_ACTIVITY_LOG_REQUEST'
export const BULK_ACTIVITY_LOG_VALIDATION_ERROR = 'BULK_ACTIVITY_LOG_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_BULK_ACTIVITY_LOG_FIELD_VALIDATION_ERROR = "HIDE_BULK_ACTIVITY_LOG_FIELD_VALIDATION_ERROR"
export const BULK_ACTIVITY_LOG_GET_SUCCESS = 'BULK_ACTIVITY_LOG_GET_SUCCESS'
export const REDIRECT_TO_BULK_ACTIVITY_LOG = 'REDIRECT_TO_BULK_ACTIVITY_LOG'
export const BULK_SETUP_BY_CLIENT_SUCCESS = 'BULK_SETUP_BY_CLIENT_SUCCESS'
export const BULK_ACTIVITY_FILE_UPLOAD_SUCCESS = 'BULK_ACTIVITY_FILE_UPLOAD_SUCCESS'
export const UPADTE_REQUEST_PROCESS_COUNT = 'UPADTE_REQUEST_PROCESS_COUNT'
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
export const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const bulkActivityLogRequest = () => ({
  type: BULK_ACTIVITY_LOG_REQUEST,
})

const bulkActivitySetupByClientSuccess = bulkSetupList => ({
  type: BULK_SETUP_BY_CLIENT_SUCCESS,
  bulkSetupList: bulkSetupList,
})

const bulkActivityLogFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const validationError = notification => ({
  type: BULK_ACTIVITY_LOG_VALIDATION_ERROR,
  validation_error: notification,
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const bulkActivityLogAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(bulkActivityLogSuccessNotification(message))
  dispatch(redirectToBulkActivityLog())
}

export const redirectToBulkActivityLog = () => ({
  type: REDIRECT_TO_BULK_ACTIVITY_LOG,
})

const getBulkActivityLogSuccess = (response, action) => ({
  type: BULK_ACTIVITY_LOG_GET_SUCCESS,
  record: response,
  actionType: action
})

const logFileUploadSuccess = (response, dispatch) => {
  dispatch(bulkActivityLogSuccessNotification('File Uploaded Successfully'))
  dispatch(logFileUploadSuccessAction(response))
}

const logFileUploadSuccessAction = (response) => ({
  type: BULK_ACTIVITY_FILE_UPLOAD_SUCCESS,
  record: response
})

const bulkActivityLogSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

const updateRequestProcessCount = () => ({
  type: UPADTE_REQUEST_PROCESS_COUNT,
})

export const hideBulkActivityLogValidationError = (field_key) => ({
  type: HIDE_BULK_ACTIVITY_LOG_FIELD_VALIDATION_ERROR,
  field_key: field_key
})

export const bulkActivitySetupByClient = (client_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(bulkActivityLogRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "bulk_activity_setup/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: [
        {
          "key": "client_id",
          "value": client_id
        }
      ]
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(bulkActivitySetupByClientSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const uploadLogFile = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(bulkActivityLogRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "bulk_activity_log/uploadLogFile", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
      /*onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        console.log("onUploadProgress", totalLength);
        if (totalLength !== null) {
          dispatch(showCommonLoader(Math.round( (progressEvent.loaded * 100) / totalLength )))
          //this.updateProgressBarValue(Math.round( (progressEvent.loaded * 100) / totalLength ));
        }
      }*/
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        logFileUploadSuccess(response.data, dispatch);
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addBulkActivityLog = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(bulkActivityLogRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "bulk_activity_log/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data
    })
      .then((response) => {
        dispatch(updateRequestProcessCount())
        dispatch(hideCommonLoader())
        bulkActivityLogAddUpadteSuccess('Bulk Activities Logged Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(updateRequestProcessCount())
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addBulkActivityLogDummy = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(bulkActivityLogRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "bulk_activity_log/createDummy", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data
    })
      .then((response) => {
        //dispatch(hideCommonLoader())
        dispatch(updateRequestProcessCount())
        //bulkActivityLogAddUpadteSuccess('Bulk Activity Log Added Successfully', 'create', dispatch)
      }, (error) => {
        //dispatch(hideCommonLoader())
        dispatch(updateRequestProcessCount())
        //handleErrorResponse(error, dispatch)
      });

  }
}

export const getBulkActivityLogById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(bulkActivityLogRequest())
    return axios(API_URL + "bulk_activity_log/getById/" + id, {
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
        dispatch(getBulkActivityLogSuccess(response.data, action))
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
      dispatch(bulkActivityLogFailure(err))
    }
  }
  catch (e) {
    dispatch(bulkActivityLogFailure('Unable to perform action.Something went wrong'))
  }
}   