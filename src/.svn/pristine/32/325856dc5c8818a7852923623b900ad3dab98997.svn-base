import axios from 'axios';
import { API_URL } from 'configs'

export const OFFICES_REQUEST = 'OFFICES_REQUEST'
export const OFFICES_SUCCESS = 'OFFICES_SUCCESS'
export const OFFICES_VALIDATION_ERROR = 'OFFICES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_OFFICES_FEILD_VALIDATION_ERROR = "HIDE_OFFICES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_OFFICES_LIST = 'REDIRECT_TO_OFFICES_LIST'
export const OFFICES_GET_SUCCESS = 'OFFICES_GET_SUCCESS'
export const COUNTRIES_LIST_SUCCESS = 'COUNTRIES_LIST_SUCCESS'
export const CITIES_LIST_SUCCESS = 'CITIES_LIST_SUCCESS'
export const OFFICES_DROPDOWN_LIST_SUCCESS = 'CLIENT_DROPDOWN_LIST_SUCCESS'
export const OFFICES_SERVER_SUCCESS = 'OFFICES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const officesRequest = () => ({
  type: OFFICES_REQUEST,
})

export const officesServerListSuccess = () => ({
  type: OFFICES_SERVER_SUCCESS,
})

const countriesListSuccess = countriesList => ({
  type: COUNTRIES_LIST_SUCCESS,
  countriesList: countriesList,
})

const citiesListSuccess = citiesList => ({
  type: CITIES_LIST_SUCCESS,
  citiesList: citiesList,
})

const officesListSuccess = officesList => ({
  type: OFFICES_SUCCESS,
  officesList: officesList,
})

const officesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: OFFICES_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const officesAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(officesSuccessNotification(message))
  dispatch(redirectToOfficesList())
}

export const redirectToOfficesList = () => ({
  type: REDIRECT_TO_OFFICES_LIST,
})

const getOfficesSuccess = (response, action) => ({
  type: OFFICES_GET_SUCCESS,
  record: response,
  actionType: action
})

const officesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideOfficesValidationError = (feild_key) => ({
  type: HIDE_OFFICES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

/*
* offices dropdown list fetch methods
*/
const officesDropdownListSuccess = officesDropdownList => ({
  type: OFFICES_DROPDOWN_LIST_SUCCESS,
  officesDropdownList: officesDropdownList,
})

export const officesDropdownListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/getAllForDropdown", {
      method: "POST",
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
        dispatch(officesDropdownListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

export const officesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/getAll", {
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
      dispatch(officesListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const countriesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "countries/getAll", {
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
        dispatch(countriesListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const citiesListFetch = (country_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  let request_data = [
    {
      "key": "country_id",
      "value": country_id
    },
  ];

  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "cities/getByAttributes", {
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
        dispatch(hideCommonLoader())
        dispatch(citiesListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const addOffices = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/create", {
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
        officesAddUpadteSuccess('Office Added Successfully', 'create', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateOffices = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/update/" + data.get('id'), {
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
        officesAddUpadteSuccess('Office Updated Successfully', 'update', dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getOfficesById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/getById/" + id, {
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
        dispatch(getOfficesSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteOffices = (officesId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(officesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "offices/delete/" + officesId, {
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
        dispatch(officesSuccessNotification('Office deleted successfully'))
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
      dispatch(officesFailure(err))
    }
  }
  catch (e) {
    dispatch(officesFailure('Unable to perform action.Something went wrong'))
  }
}   