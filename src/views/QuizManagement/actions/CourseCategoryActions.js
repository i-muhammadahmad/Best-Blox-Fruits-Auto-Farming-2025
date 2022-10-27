import axios from 'axios';
import { API_URL } from 'configs'

export const COURSE_CATEGORY_REQUEST = 'COURSE_CATEGORY_REQUEST'
export const COURSE_CATEGORY_SUCCESS = 'COURSE_CATEGORY_SUCCESS'
export const COURSE_CATEGORIES_BY_ATTR_SUCCESS = 'COURSE_CATEGORIES_BY_ATTR_SUCCESS'
export const COURSE_CATEGORY_VALIDATION_ERROR = 'COURSE_CATEGORY_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_COURSE_CATEGORY_FEILD_VALIDATION_ERROR = "HIDE_COURSE_CATEGORY_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_COURSE_CATEGORY_LIST = 'REDIRECT_TO_COURSE_CATEGORY_LIST'
export const COURSE_CATEGORY_PARENT_SUCCESS = 'COURSE_CATEGORY_PARENT_SUCCESS'
export const COURSE_CATEGORY_GET_SUCCESS = 'COURSE_CATEGORY_GET_SUCCESS'
export const COURSE_CATEGORY_DROPDOWN_LIST_SUCCESS = 'COURSE_CATEGORY_DROPDOWN_LIST_SUCCESS'
export const COURSE_CATEGORY_SERVER_SUCCESS = 'COURSE_CATEGORY_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const courseCategoryRequest = () => ({
  type: COURSE_CATEGORY_REQUEST,
})

export const courseCategoryServerListSuccess = () => ({
  type: COURSE_CATEGORY_SERVER_SUCCESS,
})

const courseCategoryListSuccess = courseCategoryList => ({
  type: COURSE_CATEGORY_SUCCESS,
  courseCategoryList: courseCategoryList,
})

const courseCategoryParentListSuccess = courseCategoryParentsList => ({
  type: COURSE_CATEGORY_PARENT_SUCCESS,
  courseCategoryParentsList: courseCategoryParentsList,
})

const courseCategoryFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: COURSE_CATEGORY_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const courseCategoryAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(courseCategorySuccessNotification(message))
  dispatch(redirectToCourseCategoryList())
}

export const redirectToCourseCategoryList = () => ({
  type: REDIRECT_TO_COURSE_CATEGORY_LIST,
})

const getCourseCategorySuccess = (response, action) => ({
  type: COURSE_CATEGORY_GET_SUCCESS,
  record: response,
  actionType: action
})

const courseCategorySuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideCourseCategoryValidationError = (feild_key) => ({
  type: HIDE_COURSE_CATEGORY_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

const courseCategoriesByAttrListSuccess = courseCategoriesByAttrList => ({
  type: COURSE_CATEGORIES_BY_ATTR_SUCCESS,
  courseCategoriesByAttrList: courseCategoriesByAttrList,
})

/*
* courseCategories dropdown list fetch methods
*/
const courseCategoryDropdownListSuccess = courseCategoriesDropdownList => ({
  type: COURSE_CATEGORY_DROPDOWN_LIST_SUCCESS,
  courseCategoriesDropdownList: courseCategoriesDropdownList,
})

export const courseCategoryDropdownListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        object_viewed_id: object_viewed_id
      }
    })
    .then((response) => {
      dispatch(courseCategoryDropdownListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}


export const courseCategoriesByAttrListFetch = (object_viewed_id = '', request_data = []) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/getByAttributes", {
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
        dispatch(courseCategoriesByAttrListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const courseCategoryListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(courseCategoryListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const courseCategoryParentListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/getAllParents", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(courseCategoryParentListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addCourseCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        courseCategoryAddUpadteSuccess('Course Category Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateCourseCategory = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        courseCategoryAddUpadteSuccess('Course Category Updated Successfully', 'update', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const getCourseCategoryById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getCourseCategorySuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteCourseCategory = (courseCategoryId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(courseCategoryRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "course_category/delete/" + courseCategoryId, {
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
        dispatch(courseCategorySuccessNotification('Course Category deleted successfully'))
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
      dispatch(courseCategoryFailure(err))
    }
  }
  catch (e) {
    dispatch(courseCategoryFailure('Unable to perform action.Something went wrong'))
  }
}   