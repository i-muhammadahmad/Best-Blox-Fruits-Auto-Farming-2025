import axios from 'axios';
import { API_URL } from 'configs'
import { isEmpty } from 'lodash'

export const ASSET_TYPES_REQUEST = 'ASSET_TYPES_REQUEST'
export const ASSET_TYPES_SUCCESS = 'ASSET_TYPES_SUCCESS'
export const ASSET_TYPES_VALIDATION_ERROR = 'ASSET_TYPES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ASSET_TYPES_FEILD_VALIDATION_ERROR = "HIDE_ASSET_TYPES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ASSET_TYPES_LIST = 'REDIRECT_TO_ASSET_TYPES_LIST'
export const ASSET_TYPES_GET_SUCCESS = 'ASSET_TYPES_GET_SUCCESS'
export const ASSET_TYPE_ADD_UPDATE_SUCCESS = 'ASSET_TYPE_ADD_UPDATE_SUCCESS'
export const SET_ASSET_TYPE_ADD_UPDATE_STATUS_FALSE = 'SET_ASSET_TYPE_ADD_UPDATE_STATUS_FALSE'
export const SET_ASSET_TYPE_ID = 'SET_ASSET_TYPE_ID'
export const ASSET_TYPES_SERVER_SUCCESS = 'ASSET_TYPES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const assetTypesRequest = () => ({
  type: ASSET_TYPES_REQUEST,
})

export const assetTypesServerListSuccess = () => ({
  type: ASSET_TYPES_SERVER_SUCCESS
})

const assetTypesListSuccess = assetTypesList => ({
  type: ASSET_TYPES_SUCCESS,
  assetTypesList: assetTypesList,
})

const ATAddUpadteSuccess = asset_type_id => ({
  type: ASSET_TYPE_ADD_UPDATE_SUCCESS,
  asset_type_id: asset_type_id,
});

export const setAssetTypeId = asset_type_id => ({
  type: SET_ASSET_TYPE_ID,
  asset_type_id: asset_type_id,
});

export const setAssetTypeAddUpdateStatusFalse = () => ({
  type: SET_ASSET_TYPE_ADD_UPDATE_STATUS_FALSE,
})

export const assetTypesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const validationError = notification => ({
  type: ASSET_TYPES_VALIDATION_ERROR,
  validation_error: notification,
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const assetTypesAddUpadteSuccess = (message, action, data, dispatch) => {
  dispatch(assetTypesSuccessNotification(message))
  if (isEmpty(data.id)) {
    dispatch(ATAddUpadteSuccess(""))
  }
  else {
    dispatch(ATAddUpadteSuccess(data.id))
  }
  //dispatch(redirectToAssetTypesList())
}


export const redirectToAssetTypesList = () => ({
  type: REDIRECT_TO_ASSET_TYPES_LIST,
})

const getAssetTypesSuccess = (response, action) => ({
  type: ASSET_TYPES_GET_SUCCESS,
  record: response,
  actionType: action
})

const assetTypesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const hideAssetTypesValidationError = (feild_key) => ({
  type: HIDE_ASSET_TYPES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const assetTypesListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(assetTypesRequest())
    return axios(API_URL + "asset_types/getAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      params: {object_viewed_id: object_viewed_id}
    })
      .then((response) => {
        dispatch(assetTypesListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const addAssetTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(assetTypesRequest())
    return axios(API_URL + "asset_types/create", {
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
        assetTypesAddUpadteSuccess('Asset Type Created Successfully', 'create', response.data, dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const updateAssetTypes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_types/update/" + data.get('id'), {
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
        assetTypesAddUpadteSuccess('Asset Type Updated Successfully', 'update', response.data, dispatch)
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getAssetTypesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_types/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getAssetTypesSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const deleteAssetTypes = (assetTypesId, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetTypesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_types/delete/" + assetTypesId, {
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
        dispatch(assetTypesSuccessNotification('Asset Type deleted successfully'))
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
      dispatch(assetTypesFailure(err))
    }
  }
  catch (e) {
    dispatch(assetTypesFailure('Unable to perform action.Something went wrong'))
  }
}

