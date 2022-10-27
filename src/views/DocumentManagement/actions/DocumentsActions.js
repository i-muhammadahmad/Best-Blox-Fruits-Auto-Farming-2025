import axios from 'axios';
import { API_URL } from 'configs'

export const DOCUMENTS_REQUEST = 'DOCUMENTS_REQUEST'
export const DOCUMENTS_SUCCESS = 'DOCUMENTS_SUCCESS'
export const DOCUMENTS_VALIDATION_ERROR = 'DOCUMENTS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_DOCUMENTS_FEILD_VALIDATION_ERROR = "HIDE_DOCUMENTS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_DOCUMENTS_LIST = 'REDIRECT_TO_DOCUMENTS_LIST'
export const DOCUMENTS_GET_SUCCESS = 'DOCUMENTS_GET_SUCCESS'
export const DOCUMENTS_SERVER_SUCCESS = 'DOCUMENTS_SERVER_SUCCESS'
export const DOCUMENTS_DROPDOWN_LIST_SUCCESS = 'DOCUMENTS_DROPDOWN_LIST_SUCCESS'
export const DOCUMENTS_LIST_WITH_ACCESS_SUCCESS = 'DOCUMENTS_LIST_WITH_ACCESS_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const documentsRequest = () => ({
  type: DOCUMENTS_REQUEST,
})

export const documentsServerListSuccess = () => ({
  type: DOCUMENTS_SERVER_SUCCESS,
})

const documentsListSuccess = documentsList => ({
  type: DOCUMENTS_SUCCESS,
  documentsList: documentsList,
})

const documentsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: DOCUMENTS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const documentsAddUpadteSuccess = (message, action, dispatch, redirect) => {
  dispatch(documentsSuccessNotification(message))
  if(redirect === true){
    dispatch(redirectToDocumentsList())
  }
}

export const redirectToDocumentsList = () => ({
  type: REDIRECT_TO_DOCUMENTS_LIST,
})

const getDocumentsSuccess = (response, action) => ({
  type: DOCUMENTS_GET_SUCCESS,
  record: response,
  actionType: action
})

const documentsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideDocumentsValidationError = (feild_key) => ({
  type: HIDE_DOCUMENTS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

const documentsListWithAccessSuccess = documentsListWithAccess => ({
  type: DOCUMENTS_LIST_WITH_ACCESS_SUCCESS,
  documentsListWithAccess: documentsListWithAccess,
})

export const documentsListWithAccessFetch = (object_viewed_id = '', category_id = '') => {
  var token  = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    return axios(API_URL+"documents/getDocumentsWithAccess", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization':'Bearer '+token
      },
      data: {
        object_viewed_id: object_viewed_id,
        category_id: category_id
      }
    })
    .then((response) => {
      dispatch(documentsListWithAccessSuccess(response.data))
    }, (error) => {
      handleErrorResponse(error,dispatch)
    });
      
  }
}

/*
  * documents dropdown list fetch methods
  */
const documentsDropdownListSuccess = documentsDropdownList => ({
  type: DOCUMENTS_DROPDOWN_LIST_SUCCESS,
  documentsDropdownList: documentsDropdownList,
})

export const documentsDropdownListFetch = (object_viewed_id = '') => {
  var token  = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    return axios(API_URL+"documents/getAllForDropdown", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization':'Bearer '+token
      },
      params: {object_viewed_id: object_viewed_id}
    })
    .then((response) => {
      dispatch(documentsDropdownListSuccess(response.data))
    }, (error) => {
      handleErrorResponse(error,dispatch)
    });
      
  }
}

export const documentsListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/getAll", {
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
      dispatch(documentsListSuccess(response.data))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const addDocuments = (data, redirect) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/create", {
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
        // Setting the document id and title in the local storage 
        let docData = {[response.data.id]:{id: response.data.id,title: response.data.title}};
        localStorage.setItem('inserted_document', JSON.stringify(docData));
        documentsAddUpadteSuccess('Document Added Successfully', 'create', dispatch, redirect)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateDocuments = (data, redirect) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/update/" + data.get('id'), {
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
        documentsAddUpadteSuccess('Document Updated Successfully', 'update', dispatch, redirect)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getDocumentsById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/getById/" + id, {
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
        dispatch(getDocumentsSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getDocumentsViewById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/getDocumentsViewById/" + id, {
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
        dispatch(getDocumentsSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const deleteDocuments = (documentsId, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(documentsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "documents/delete/" + documentsId, {
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
        dispatch(documentsSuccessNotification('Document deleted successfully'))
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
      dispatch(documentsFailure(err))
    }
  }
  catch (e) {
    dispatch(documentsFailure('Unable to perform action.Something went wrong'))
  }
}   