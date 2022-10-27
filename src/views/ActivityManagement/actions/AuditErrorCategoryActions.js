import axios from 'axios';
import {API_URL} from 'configs'
import {isEmpty} from 'lodash'

export const AUDIT_ERROR_CATEGORY_REQUEST = 'AUDIT_ERROR_CATEGORY_REQUEST'
export const AUDIT_ERROR_CATEGORY_SUCCESS = 'AUDIT_ERROR_CATEGORY_SUCCESS'
export const AUDIT_ERROR_CATEGORY_VALIDATION_ERROR = 'AUDIT_ERROR_CATEGORY_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_AUDIT_ERROR_CATEGORY_FEILD_VALIDATION_ERROR = "HIDE_AUDIT_ERROR_CATEGORY_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_AUDIT_ERROR_CATEGORY_LIST = 'REDIRECT_TO_AUDIT_ERROR_CATEGORY_LIST'
export const AUDIT_ERROR_CATEGORY_BY_CLIENT_SUCCESS = 'AUDIT_ERROR_CATEGORY_BY_CLIENT_SUCCESS'
export const AUDIT_ERROR_CATEGORY_GET_SUCCESS = 'AUDIT_ERROR_CATEGORY_GET_SUCCESS'
export const AUDIT_ERROR_CATEGORY_SERVER_SUCCESS = 'AUDIT_ERROR_CATEGORY_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

  const auditErrorCategoryRequest = () => ({
      type: AUDIT_ERROR_CATEGORY_REQUEST,
  })

  export const auditErrorCategoryServerListSuccess = () => ({
    type: AUDIT_ERROR_CATEGORY_SERVER_SUCCESS,
  }) 

  const auditErrorCategoryListSuccess = auditErrorCategoryList => ({
    type: AUDIT_ERROR_CATEGORY_SUCCESS,
    auditErrorCategoryList: auditErrorCategoryList,
  }) 

  const auditErrorCategoryByClientSuccess = auditErrorCategoryByClientList => ({
    type: AUDIT_ERROR_CATEGORY_BY_CLIENT_SUCCESS,
    auditErrorCategoryByClientList: auditErrorCategoryByClientList,
  }) 
  
  const auditErrorCategoryFailure = notification => ({
      type: SHOW_SNACKBAR,
      snackbar_notification: notification,
      snackbar_notification_type: 'general_error'
  })
  const validationError = notification => ({
    type: AUDIT_ERROR_CATEGORY_VALIDATION_ERROR,
    validation_error: notification,
  })
  const tokenError = notification => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: notification,
    snackbar_notification_type: 'token_expire'
  })
  
  const auditErrorCategoryAddUpadteSuccess = (message,action,dispatch) => {
    dispatch(auditErrorCategorySuccessNotification(message))
    dispatch(redirectToAuditErrorCategoryList())
  }

  export const redirectToAuditErrorCategoryList = () => ({
    type: REDIRECT_TO_AUDIT_ERROR_CATEGORY_LIST,
  })

  const getAuditErrorCategorySuccess = (response,action) => ({
    type: AUDIT_ERROR_CATEGORY_GET_SUCCESS,
    record: response,
    actionType: action
  })

  const auditErrorCategorySuccessNotification = message => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: message,
    snackbar_notification_type: 'success'
  })

  export const hideAuditErrorCategoryValidationError = (feild_key) => ({
    type: HIDE_AUDIT_ERROR_CATEGORY_FEILD_VALIDATION_ERROR,
    feild_key: feild_key
  })

  export const auditErrorCategoryListFetch = (object_viewed_id = '') => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_categories/getAll", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        params: {object_viewed_id: object_viewed_id}
      })
      .then((response) => {
        dispatch(auditErrorCategoryListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const auditErrorCategoryByClientFetch = (client_id, object_viewed_id = '') => {

    let r_data = [];
    if(!isEmpty(client_id)){
      r_data = [
        {
          "key": "client_id",
          "value": client_id
        }
      ];
    }
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_categories/getByAttributes", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        data: {
          request_data: r_data,
          object_viewed_id: object_viewed_id
        }
      })
      .then((response) => {
        dispatch(auditErrorCategoryByClientSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const addAuditErrorCategory = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_categories/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        data: data,
      })
      .then((response) => {
        auditErrorCategoryAddUpadteSuccess('Audit Error Category Added Successfully','create',dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }

  export const updateAuditErrorCategory = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_categories/update/"+data.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
        data: data
      })
      .then((response) => {
        auditErrorCategoryAddUpadteSuccess('Audit Error Category Updated Successfully','update',dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  }  

  export const getAuditErrorCategoryById = (id,action) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"audit_error_categories/getById/"+id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
      })
      .then((response) => {
        dispatch(getAuditErrorCategorySuccess(response.data,action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error,dispatch)
        dispatch(hideCommonLoader())
      });
        
    }
  } 

  export const deleteAuditErrorCategory = (auditErrorCategoryId, object_viewed_id) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(auditErrorCategoryRequest())
      dispatch(showCommonLoader())
        return axios(API_URL+"audit_error_categories/delete/"+auditErrorCategoryId, {
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
            dispatch(auditErrorCategorySuccessNotification('Audit Error Category deleted successfully'))
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
      dispatch(auditErrorCategoryFailure(err))
    }
  }
  catch(e){
    dispatch(auditErrorCategoryFailure('Unable to perform action.Something went wrong'))
  }  
}   