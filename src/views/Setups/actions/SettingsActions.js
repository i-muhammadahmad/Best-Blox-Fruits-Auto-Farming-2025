import axios from 'axios';
import { API_URL } from 'configs'

export const SETTINGS_REQUEST = 'SETTINGS_REQUEST'
export const SETTINGS_SUCCESS = 'SETTINGS_SUCCESS'
export const SETTINGS_VALIDATION_ERROR = 'SETTINGS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SETTINGS_FEILD_VALIDATION_ERROR = "HIDE_SETTINGS_FEILD_VALIDATION_ERROR"
export const SETTINGS_GET_SUCCESS = 'SETTINGS_GET_SUCCESS'
export const GENERAL_SETTINGS_SUCCESS = 'GENERAL_SETTINGS_SUCCESS'
export const HR_EMAIL_SETTINGS_SUCCESS = 'HR_EMAIL_SETTINGS_SUCCESS'
export const IT_EMAIL_SETTINGS_SUCCESS = 'IT_EMAIL_SETTINGS_SUCCESS'
export const IT_NOTIFICATION_SETTINGS_SUCCESS = 'IT_NOTIFICATION_SETTINGS_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const settingsRequest = () => ({
  type: SETTINGS_REQUEST,
})

const settingsListSuccess = settingsList => ({
  type: SETTINGS_SUCCESS,
  settingsList: settingsList,
})

const settingsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: SETTINGS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const settingsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(settingsSuccessNotification(message))
}

const getSettingsSuccess = (response, action) => ({
  type: SETTINGS_GET_SUCCESS,
  record: response,
  actionType: action
})

const settingsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideSettingsValidationError = (feild_key) => ({
  type: HIDE_SETTINGS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const settingsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getAll", {
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
        dispatch(settingsListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const saveSettings = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/saveSiteSettings", {
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
      settingsAddUpadteSuccess('Settings Saved Successfully', 'update', dispatch)
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const getSettingsById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getSettingsSuccess(response.data, action))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

const getGeneralSettingsSuccess = (response) => ({
  type: GENERAL_SETTINGS_SUCCESS,
  settingsGeneral: response,
})

export const getGeneralSettings = (setting_type = 'General', object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getSettingByType/" + setting_type, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getGeneralSettingsSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

const getHREmailSettingsSuccess = (response) => ({
  type: HR_EMAIL_SETTINGS_SUCCESS,
  settingsHREmail: response,
})

export const getHREmailSettings = (setting_type = 'OfficesHREmail', object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getSettingByType/" + setting_type, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getHREmailSettingsSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

const getITEmailSettingsSuccess = (response) => ({
  type: IT_EMAIL_SETTINGS_SUCCESS,
  settingsITEmail: response,
})

export const getITEmailSettings = (setting_type = 'OfficesITEmail', object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getSettingByType/" + setting_type, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getITEmailSettingsSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}


const getITNotificationSettingsSuccess = (response) => ({
  type: IT_NOTIFICATION_SETTINGS_SUCCESS,
  settingsITNotification: response,
})

export const getITNotificationSettings = (setting_type = 'OfficesITNotification', object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(settingsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "settings/getSettingByType/" + setting_type, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getITNotificationSettingsSuccess(response.data))
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
      dispatch(settingsFailure(err))
    }
  }
  catch (e) {
    dispatch(settingsFailure('Unable to perform action.Something went wrong'))
  }
}   