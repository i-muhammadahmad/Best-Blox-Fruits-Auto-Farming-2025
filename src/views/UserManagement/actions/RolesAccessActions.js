import axios from 'axios';
import { API_URL } from 'configs'

export const ROLES_ACCESS_REQUEST = 'ROLES_ACCESS_REQUEST'
export const ROLES_ACCESS_SUCCESS = 'ROLES_ACCESS_SUCCESS'
export const ROLES_ACCESS_VALIDATION_ERROR = 'ROLES_ACCESS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ROLES_ACCESS_FEILD_VALIDATION_ERROR = "HIDE_ROLES_ACCESS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ROLES_ACCESS_LIST = 'REDIRECT_TO_ROLES_ACCESS_LIST'
export const ROLES_ACCESS_GET_SUCCESS = 'ROLES_ACCESS_GET_SUCCESS'
export const SET_PERMISSIONS_FETCHED_FALSE = 'SET_PERMISSIONS_FETCHED_FALSE'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const rolesAccessRequest = () => ({
  type: ROLES_ACCESS_REQUEST,
})

const permissionsListByRoleSuccess = permissionsListByRole => ({
  type: ROLES_ACCESS_SUCCESS,
  permissionsListByRole: permissionsListByRole,
})

const rolesAccessFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: ROLES_ACCESS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const rolesAccessAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(rolesAccessSuccessNotification(message))
  dispatch(redirectToRolesAccessList())
}

export const setPermissionFetchedFalse = () => ({
  type: SET_PERMISSIONS_FETCHED_FALSE
})

export const redirectToRolesAccessList = () => ({
  type: REDIRECT_TO_ROLES_ACCESS_LIST,
})

const getRolesAccessSuccess = (response, action) => ({
  type: ROLES_ACCESS_GET_SUCCESS,
  record: response,
  actionType: action
})

const rolesAccessSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideRolesAccessValidationError = (feild_key) => ({
  type: HIDE_ROLES_ACCESS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const permissionsByRoleFetch = (role_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(rolesAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "roles_permissions/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: [
        {
          "key": "role_id",
          "value": role_id
        }
      ]
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(permissionsListByRoleSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const saveRolesAccess = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(rolesAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "roles_permissions/save", {
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
        rolesAccessAddUpadteSuccess('Roles Access Saved Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getRolesAccessById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(rolesAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "roles_permissions/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getRolesAccessSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteRolesAccess = (rolesAccessId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(rolesAccessRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "roles_permissions/delete/" + rolesAccessId, {
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
        dispatch(rolesAccessSuccessNotification('Roles Access deleted successfully'))
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
      dispatch(rolesAccessFailure(err))
    }
  }
  catch (e) {
    dispatch(rolesAccessFailure('Unable to perform action.Something went wrong'))
  }
}   