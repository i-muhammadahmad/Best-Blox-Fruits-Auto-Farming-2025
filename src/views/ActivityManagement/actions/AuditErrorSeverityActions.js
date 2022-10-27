import axios from 'axios';
import {API_URL} from 'configs'

export const ERROR_SEVERITY_REQUEST = 'ERROR_SEVERITY_REQUEST'
export const ERROR_SEVERITY_SUCCESS = 'ERROR_SEVERITY_SUCCESS'
export const ERROR_SEVERITY_VALIDATION_ERROR = 'ERROR_SEVERITY_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ERROR_SEVERITY_FEILD_VALIDATION_ERROR = "HIDE_ERROR_SEVERITY_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ERROR_SEVERITY_LIST = 'REDIRECT_TO_ERROR_SEVERITY_LIST'
export const ERROR_SEVERITY_GET_SUCCESS = 'ERROR_SEVERITY_GET_SUCCESS'
export const AUDIT_ERROR_SEVERITIES_BY_CLIENT_SUCCESS = 'AUDIT_ERROR_SEVERITIES_BY_CLIENT_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

  const errorSeverityRequest = () => ({
    type: ERROR_SEVERITY_REQUEST,
  })
  
  const errorSeverityListSuccess = errorSeverityList => ({
    type: ERROR_SEVERITY_SUCCESS,
    errorSeverityList: errorSeverityList,
  }) 
  
  const errorSeverityFailure = notification => ({
      type: SHOW_SNACKBAR,
      snackbar_notification: notification,
      snackbar_notification_type: 'general_error'
  })
  const validationError = notification => ({
    type: ERROR_SEVERITY_VALIDATION_ERROR,
    validation_error: notification,
  })
  const tokenError = notification => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: notification,
    snackbar_notification_type: 'token_expire'
  })
  
  const errorSeverityAddUpadteSuccess = (message,action,dispatch) => {
    dispatch(errorSeveritySuccessNotification(message))
    dispatch(redirectToErrorSeverityList())
  }

  export const redirectToErrorSeverityList = () => ({
    type: REDIRECT_TO_ERROR_SEVERITY_LIST,
  })

  const getErrorSeveritySuccess = (response,action) => ({
    type: ERROR_SEVERITY_GET_SUCCESS,
    record: response,
    actionType: action
  })

  const errorSeveritySuccessNotification = message => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: message,
    snackbar_notification_type: 'success'
  })

  const getErrorSeveritiesByClientSuccess = auditErrorSeveritiesList => ({
    type: AUDIT_ERROR_SEVERITIES_BY_CLIENT_SUCCESS,
    auditErrorSeveritiesList: auditErrorSeveritiesList,
  }) 

  export const hideErrorSeverityValidationError = (feild_key) => ({
    type: HIDE_ERROR_SEVERITY_FEILD_VALIDATION_ERROR,
    feild_key: feild_key
  })

  export const errorSeverityListFetch = () => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_severity/getAll", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
      })
      .then((response) => {
        dispatch(errorSeverityListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const addErrorSeverity = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_severity/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        data: data,
      })
      .then((response) => {
        errorSeverityAddUpadteSuccess('Error Severity Added Successfully','create',dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const updateErrorSeverity = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_severity/update/"+data.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
        data: data
      })
      .then((response) => {
        errorSeverityAddUpadteSuccess('Error Severity Updated Successfully','update',dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const getErrorSeveritiesByClient = (client_id) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_severity/getByClient/"+client_id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
      })
      .then((response) => {
        dispatch(getErrorSeveritiesByClientSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const getErrorSeverityById = (id,action) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_severity/getById/"+id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
      })
      .then((response) => {
        dispatch(getErrorSeveritySuccess(response.data,action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  } 

  export const deleteErrorSeverity = (errorSeverityId, object_viewed_id) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(errorSeverityRequest())
      dispatch(showCommonLoader())
        return axios(API_URL+"audit_error_severity/delete/"+errorSeverityId, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization':'Bearer '+token
          },
          data:{
            object_viewed_id
          }
        })
        .then((response) => {
            dispatch(errorSeveritySuccessNotification('Error Severity deleted successfully'))
            dispatch(errorSeverityListFetch())
            dispatch(hideCommonLoader())
        }, (error) => {
          handleErrorResponse(error,dispatch)
          dispatch(hideCommonLoader())
        });
      }  
        
  }
 
// handling error reponse   
const handleErrorResponse = (error,dispatch) => {
  try{
    if(error.response.status === 422 && error.response.data.error){
      dispatch(validationError(error.response.data.error))
    }
    else if(error.response.status === 401 && error.response.data.error){
      dispatch(tokenError(error.response.data.error.toString()))
    }
    else{
      let err = '';
      if(error.response.data.error){
        err = error.response.data.error.toString()
      }
      else{
        err = error.response.status+` `+error.response.statusText
      }
      dispatch(errorSeverityFailure(err))
    }
  }
  catch(e){
    dispatch(errorSeverityFailure('Unable to perform action.Something went wrong'))
  }  
}   