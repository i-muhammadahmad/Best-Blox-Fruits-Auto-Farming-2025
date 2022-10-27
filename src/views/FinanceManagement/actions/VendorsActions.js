import axios from 'axios';
import {API_URL} from 'configs'
export const VENDORS_REQUEST = 'VENDORS_REQUEST'
export const VENDORS_SUCCESS = 'VENDORS_SUCCESS'
export const VENDORS_VALIDATION_ERROR = 'VENDORS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_VENDORS_FEILD_VALIDATION_ERROR = "HIDE_VENDORS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_VENDORS_LIST = 'REDIRECT_TO_VENDORS_LIST'
export const VENDORS_GET_SUCCESS = 'VENDORS_GET_SUCCESS'
export const VENDORS_DROPDOWN_LIST_SUCCESS = 'VENDORS_DROPDOWN_LIST_SUCCESS'
export const VENDORS_SERVER_SUCCESS = 'VENDORS_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

  const vendorsRequest = () => ({
      type: VENDORS_REQUEST,
  })

  export const vendorsServerListSuccess = () => ({
    type: VENDORS_SERVER_SUCCESS,
  }) 
  
  const vendorsListSuccess = vendorsList => ({
    type: VENDORS_SUCCESS,
    vendorsList: vendorsList,
  }) 

  const vendorsFailure = notification => ({
      type: SHOW_SNACKBAR,
      snackbar_notification: notification,
      snackbar_notification_type: 'general_error'
  })
  const validationError = notification => ({
    type: VENDORS_VALIDATION_ERROR,
    validation_error: notification,
  })
  const tokenError = notification => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: notification,
    snackbar_notification_type: 'token_expire'
  })
  
  const vendorsAddUpadteSuccess = (message,action,dispatch) => {
    dispatch(vendorsSuccessNotification(message))
    dispatch(redirectToVendorsList())
  }

  export const redirectToVendorsList = () => ({
    type: REDIRECT_TO_VENDORS_LIST,
  })

  const getVendorsSuccess = (response,action) => ({
    type: VENDORS_GET_SUCCESS,
    record: response,
    actionType: action
  })

  const vendorsSuccessNotification = message => ({
    type: SHOW_SNACKBAR,
    snackbar_notification: message,
    snackbar_notification_type: 'success'
  })


  export const hideVendorsValidationError = (feild_key) => ({
    type: HIDE_VENDORS_FEILD_VALIDATION_ERROR,
    feild_key: feild_key
  })

  /*
  * vendors dropdown list fetch methods
  */
  const vendorsDropdownListSuccess = vendorsDropdownList => ({
    type: VENDORS_DROPDOWN_LIST_SUCCESS,
    vendorsDropdownList: vendorsDropdownList,
  })

  export const vendorsDropdownListFetch = (object_viewed_id = '') => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"vendor/getAllForDropdown", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        params: {object_viewed_id: object_viewed_id}
      })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(vendorsDropdownListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error,dispatch)
      });
        
    }
  }

  export const vendorsListFetch = (object_viewed_id = '') => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"vendor/getAll", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        params: {object_viewed_id: object_viewed_id}
      })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(vendorsListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error,dispatch)
      });
        
    }
  }

  export const addVendors = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"vendor/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer '+token
        },
        data: data,
      })
      .then((response) => {
        dispatch(hideCommonLoader())
        vendorsAddUpadteSuccess('Vendor Added Successfully','create',dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error,dispatch)
      });
        
    }
  }

  export const updateVendors = (data) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"vendor/update/"+data.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
        data: data
      })
      .then((response) => {
        dispatch(hideCommonLoader())
        vendorsAddUpadteSuccess('Vendor Updated Successfully','update',dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error,dispatch)
      });
        
    }
  }  

  export const getVendorsById = (id,action) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
      return axios(API_URL+"vendor/getById/"+id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization':'Bearer  '+token
        },
      })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(getVendorsSuccess(response.data,action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error,dispatch)
      });
        
    }
  } 

  export const deleteVendors = (vendorsId, object_viewed_id) => {
    var token  = localStorage.getItem("token")
    return dispatch => {
      dispatch(vendorsRequest())
      dispatch(showCommonLoader())
        return axios(API_URL+"vendor/delete/"+vendorsId, {
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
            dispatch(hideCommonLoader())
            dispatch(vendorsSuccessNotification('Vendor deleted successfully'))
        }, (error) => {
          dispatch(hideCommonLoader())
          handleErrorResponse(error,dispatch)
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
      dispatch(vendorsFailure(err))
    }
  }
  catch(e){
    dispatch(vendorsFailure('Unable to perform action.Something went wrong'))
  }  
}   