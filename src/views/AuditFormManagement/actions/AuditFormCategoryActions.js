import axios from 'axios';
import { API_URL } from 'configs'

export const AUDIT_FORM_CATEGORY_REQUEST = 'AUDIT_FORM_CATEGORY_REQUEST'
export const AUDIT_FORM_CATEGORY_SUCCESS = 'AUDIT_FORM_CATEGORY_SUCCESS'
export const AUDIT_FORM_CATEGORIES_BY_ATTR_SUCCESS = 'AUDIT_FORM_CATEGORIES_BY_ATTR_SUCCESS'
export const AUDIT_FORM_CATEGORY_VALIDATION_ERROR = 'AUDIT_FORM_CATEGORY_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_AUDIT_FORM_CATEGORY_FEILD_VALIDATION_ERROR = "HIDE_AUDIT_FORM_CATEGORY_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_AUDIT_FORM_CATEGORY_LIST = 'REDIRECT_TO_AUDIT_FORM_CATEGORY_LIST'
export const AUDIT_FORM_CATEGORY_PARENT_SUCCESS = 'AUDIT_FORM_CATEGORY_PARENT_SUCCESS'
export const AUDIT_FORM_CATEGORY_GET_SUCCESS = 'AUDIT_FORM_CATEGORY_GET_SUCCESS'
export const AUDIT_FORM_CATEGORY_DROPDOWN_LIST_SUCCESS = 'AUDIT_FORM_CATEGORY_DROPDOWN_LIST_SUCCESS'
export const AUDIT_FORM_CATEGORY_SERVER_SUCCESS = 'AUDIT_FORM_CATEGORY_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const auditFormCategoryRequest = () => ({
  type: AUDIT_FORM_CATEGORY_REQUEST,
})

export const auditFormCategoryServerListSuccess = () => ({
  type: AUDIT_FORM_CATEGORY_SERVER_SUCCESS,
})

const auditFormCategoryListSuccess = auditFormCategoryList => ({
  type: AUDIT_FORM_CATEGORY_SUCCESS,
  auditFormCategoryList: auditFormCategoryList,
})

const auditFormCategoryParentListSuccess = auditFormCategoryParentsList => ({
  type: AUDIT_FORM_CATEGORY_PARENT_SUCCESS,
  auditFormCategoryParentsList: auditFormCategoryParentsList,
})

const auditFormCategoryFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: AUDIT_FORM_CATEGORY_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const auditFormCategoryAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(auditFormCategorySuccessNotification(message))
  dispatch(redirectToAuditFormCategoryList())
}

export const redirectToAuditFormCategoryList = () => ({
  type: REDIRECT_TO_AUDIT_FORM_CATEGORY_LIST,
})

const getAuditFormCategorySuccess = (response, action) => ({
  type: AUDIT_FORM_CATEGORY_GET_SUCCESS,
  record: response,
  actionType: action
})

const auditFormCategorySuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideAuditFormCategoryValidationError = (feild_key) => ({
  type: HIDE_AUDIT_FORM_CATEGORY_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

const auditFormCategoriesByAttrListSuccess = auditFormCategoriesByAttrList => ({
  type: AUDIT_FORM_CATEGORIES_BY_ATTR_SUCCESS,
  auditFormCategoriesByAttrList: auditFormCategoriesByAttrList,
})

/*
* auditFormCategories dropdown list fetch methods
*/
const auditFormCategoryDropdownListSuccess = auditFormCategoriesDropdownList => ({
  type: AUDIT_FORM_CATEGORY_DROPDOWN_LIST_SUCCESS,
  auditFormCategoriesDropdownList: auditFormCategoriesDropdownList,
})

export const auditFormCategoryDropdownListFetch = (object_viewed_id = '', auditSetupId = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id: object_viewed_id,
        auditSetupId: auditSetupId
      }
    })
    .then((response) => {
      dispatch(auditFormCategoryDropdownListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}


export const auditFormCategoriesByAttrListFetch = (object_viewed_id = '', request_data = []) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        request_data: request_data,
        object_viewed_id: object_viewed_id
      },
    })
      .then((response) => {
        dispatch(auditFormCategoriesByAttrListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const auditFormCategoryListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(auditFormCategoryListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const auditFormCategoryParentListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/getAllParents", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(auditFormCategoryParentListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addAuditFormCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        auditFormCategoryAddUpadteSuccess('Audit Form Category Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateAuditFormCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        auditFormCategoryAddUpadteSuccess('Audit Form Category Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getAuditFormCategoryById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getAuditFormCategorySuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteAuditFormCategory = (auditFormCategoryId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(auditFormCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "auditFormCategory/delete/" + auditFormCategoryId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id
      }
    })
      .then((response) => {
        dispatch(auditFormCategorySuccessNotification('Audit Form Category deleted successfully'))
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
      dispatch(auditFormCategoryFailure(err))
    }
  }
  catch (e) {
    dispatch(auditFormCategoryFailure('Unable to perform action.Something went wrong'))
  }
}   