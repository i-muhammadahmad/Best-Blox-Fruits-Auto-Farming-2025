import axios from 'axios';
import { API_URL } from 'configs'

export const DEPARTMENTS_REQUEST = 'DEPARTMENTS_REQUEST'
export const DEPARTMENTS_SUCCESS = 'DEPARTMENTS_SUCCESS'
export const DEPARTMENTS_VALIDATION_ERROR = 'DEPARTMENTS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_DEPARTMENTS_FEILD_VALIDATION_ERROR = "HIDE_DEPARTMENTS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_DEPARTMENTS_LIST = 'REDIRECT_TO_DEPARTMENTS_LIST'
export const DEPARTMENTS_GET_SUCCESS = 'DEPARTMENTS_GET_SUCCESS'
export const DEPARTMENTS_SERVER_SUCCESS = 'DEPARTMENTS_SERVER_SUCCESS'
export const DEPARTMENTS_DROPDOWN_LIST_SUCCESS = 'DEPARTMENTS_DROPDOWN_LIST_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const departmentsRequest = () => ({
  type: DEPARTMENTS_REQUEST,
})

export const departmentsServerListSuccess = () => ({
  type: DEPARTMENTS_SERVER_SUCCESS
})

const departmentsListSuccess = departmentsList => ({
  type: DEPARTMENTS_SUCCESS,
  departmentsList: departmentsList,
})

const departmentsDropdownListSuccess= departmentsDropdownList => ({
  type: DEPARTMENTS_DROPDOWN_LIST_SUCCESS,
  departmentsDropdownList: departmentsDropdownList,
})

const departmentsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: DEPARTMENTS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const departmentsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(departmentsSuccessNotification(message))
  dispatch(redirectToDepartmentsList())
}

export const redirectToDepartmentsList = () => ({
  type: REDIRECT_TO_DEPARTMENTS_LIST,
})

const getDepartmentsSuccess = (response, action) => ({
  type: DEPARTMENTS_GET_SUCCESS,
  record: response,
  actionType: action
})

const departmentsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideDepartmentsValidationError = (feild_key) => ({
  type: HIDE_DEPARTMENTS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const departmentsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/getAll", {
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
      dispatch(departmentsListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const departmentsDropdownListFetch = (offices_ids, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'object_viewed_id': object_viewed_id,
        offices_ids: offices_ids,
      }
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(departmentsDropdownListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const addDepartments = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/create", {
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
      departmentsAddUpadteSuccess('Department Added Successfully', 'create', dispatch)
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const updateDepartments = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/update/" + data.id, {
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
      departmentsAddUpadteSuccess('Department Updated Successfully', 'update', dispatch)
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const getDepartmentsById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/getById/" + id, {
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
      dispatch(getDepartmentsSuccess(response.data, action))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });
  }
}

export const deleteDepartments = (departmentsId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(departmentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "departments/delete/" + departmentsId, {
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
      dispatch(departmentsSuccessNotification('Department deleted successfully'))
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
      dispatch(departmentsFailure(err))
    }
  }
  catch (e) {
    dispatch(departmentsFailure('Unable to perform action.Something went wrong'))
  }
}   