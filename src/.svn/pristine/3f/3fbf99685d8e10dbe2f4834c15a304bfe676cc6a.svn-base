import axios from 'axios';
import { API_URL } from 'configs'

export const EMPLOYEE_SHIFTS_REQUEST = 'EMPLOYEE_SHIFTS_REQUEST'
export const EMPLOYEE_SHIFTS_SUCCESS = 'EMPLOYEE_SHIFTS_SUCCESS'
export const EMPLOYEE_SHIFTS_VALIDATION_ERROR = 'EMPLOYEE_SHIFTS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_EMPLOYEE_SHIFTS_FEILD_VALIDATION_ERROR = "HIDE_EMPLOYEE_SHIFTS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_EMPLOYEE_SHIFTS_LIST = 'REDIRECT_TO_EMPLOYEE_SHIFTS_LIST'
export const EMPLOYEE_SHIFTS_GET_SUCCESS = 'EMPLOYEE_SHIFTS_GET_SUCCESS'
export const EMPLOYEE_SHIFT_ADD_UPDATE_STATUS = 'EMPLOYEE_SHIFT_ADD_UPDATE_STATUS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const employeeShiftsRequest = () => ({
  type: EMPLOYEE_SHIFTS_REQUEST,
})

const employeeShiftsListSuccess = employeeShiftsList => ({
  type: EMPLOYEE_SHIFTS_SUCCESS,
  employeeShiftsList: employeeShiftsList,
})

const employeeShiftsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: EMPLOYEE_SHIFTS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const employeeShiftAddUpdateStatus = (status) => ({
  type: EMPLOYEE_SHIFT_ADD_UPDATE_STATUS,
  add_update_status: status
});

const employeeShiftsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(employeeShiftsSuccessNotification(message))
  dispatch(employeeShiftAddUpdateStatus(true))
}

export const redirectToEmployeeShiftsList = () => ({
  type: REDIRECT_TO_EMPLOYEE_SHIFTS_LIST,
})

const getEmployeeShiftsSuccess = (response, action) => ({
  type: EMPLOYEE_SHIFTS_GET_SUCCESS,
  record: response,
  actionType: action
})

const employeeShiftsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideEmployeeShiftsValidationError = (feild_key) => ({
  type: HIDE_EMPLOYEE_SHIFTS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const employeeShiftsListFetch = (employee_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token");
  let request_data = [
    {
      'key': 'employee_id',
      'value': employee_id
    }
  ];
  return dispatch => {
    dispatch(employeeShiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employee_shifts/getByAttributes", {
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
      dispatch(employeeShiftsListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const addEmployeeShifts = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(employeeShiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employee_shifts/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        employeeShiftsAddUpadteSuccess('Employee Shift Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateEmployeeShifts = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(employeeShiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employee_shifts/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
    .then((response) => {
      employeeShiftsAddUpadteSuccess('Employee Shift Updated Successfully', 'update', dispatch)
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const getEmployeeShiftsById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(employeeShiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employee_shifts/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getEmployeeShiftsSuccess(response.data, action))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const deleteEmployeeShifts = (employeeShiftsId, object_viewed_id, employee_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(employeeShiftsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "employee_shifts/delete/" + employeeShiftsId, {
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
      dispatch(employeeShiftsSuccessNotification('Employee Shift deleted successfully'))
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
      dispatch(employeeShiftsFailure(err))
    }
  }
  catch (e) {
    dispatch(employeeShiftsFailure('Unable to perform action.Something went wrong'))
  }
}   