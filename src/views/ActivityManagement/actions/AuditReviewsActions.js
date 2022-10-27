import axios from 'axios';
import { API_URL } from 'configs'

export const AUDIT_REVIEW_REQUEST = 'AUDIT_REVIEW_REQUEST'
export const AUDIT_REVIEW_SUCCESS = 'AUDIT_REVIEW_SUCCESS'
export const AUDIT_REVIEW_VALIDATION_ERROR = 'AUDIT_REVIEW_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_AUDIT_REVIEW_FEILD_VALIDATION_ERROR = "HIDE_AUDIT_REVIEW_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_AUDIT_REVIEW_LIST = 'REDIRECT_TO_AUDIT_REVIEW_LIST'
export const AUDIT_REVIEW_GET_SUCCESS = 'AUDIT_REVIEW_GET_SUCCESS'
export const ALL_AUDIT_ACTIVITIES_REPORT_SUCCESS = 'ALL_AUDIT_ACTIVITIES_REPORT_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const auditReviewsRequest = () => ({
  type: AUDIT_REVIEW_REQUEST,
})

const auditReviewsListSuccess = auditReviewsList => ({
  type: AUDIT_REVIEW_SUCCESS,
  auditReviewsList: auditReviewsList,
})

const auditReviewsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: AUDIT_REVIEW_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const auditReviewsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(auditReviewsSuccessNotification(message))
  dispatch(redirectToAuditReviewsList())
}

export const redirectToAuditReviewsList = () => ({
  type: REDIRECT_TO_AUDIT_REVIEW_LIST,
})

const getAuditReviewsSuccess = (response, action) => ({
  type: AUDIT_REVIEW_GET_SUCCESS,
  record: response,
  actionType: action
})

const auditReviewsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideAuditReviewsValidationError = (feild_key) => ({
  type: HIDE_AUDIT_REVIEW_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const auditReviewsListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditReviewsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_reviews/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(auditReviewsListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addAuditReviews = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditReviewsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_reviews/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        auditReviewsAddUpadteSuccess('AuditReviews Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateAuditReviews = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditReviewsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_reviews/update/" + data.audit_review_id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        auditReviewsAddUpadteSuccess('AuditReviews Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getAuditReviewsById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditReviewsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "audit_reviews/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getAuditReviewsSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

const allLoggedAuditActivitiesSuccess =  report_data => ({
  type: ALL_AUDIT_ACTIVITIES_REPORT_SUCCESS,
  report_data: report_data,
}) 

export const getAllLoggedAuditActivities = (filters) => {
  var token  = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditReviewsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL+"activity_reports/getAuditActivities", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization':'Bearer '+token
      },
      data:filters  
    })
    .then((response) => {
      dispatch(allLoggedAuditActivitiesSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error,dispatch)
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
      dispatch(auditReviewsFailure(err))
    }
  }
  catch (e) {
    dispatch(auditReviewsFailure('Unable to perform action.Something went wrong'))
  }
}   