import axios from 'axios';
import { API_URL } from 'configs'

export const ASSET_APPROVALS_REQUEST = 'ASSET_APPROVALS_REQUEST'
export const ASSET_APPROVALS_SUCCESS = 'ASSET_APPROVALS_SUCCESS'
export const ASSET_APPROVALS_VALIDATION_ERROR = 'ASSET_APPROVALS_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_ASSET_APPROVALS_FEILD_VALIDATION_ERROR = "HIDE_ASSET_APPROVALS_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_ASSET_APPROVALS_LIST = 'REDIRECT_TO_ASSET_APPROVALS_LIST'
export const ASSET_APPROVALS_GET_SUCCESS = 'ASSET_APPROVALS_GET_SUCCESS'
export const ASSET_APPROVAL_ADD_UPDATE_STATUS = 'ASSET_APPROVAL_ADD_UPDATE_STATUS'
export const ASSET_APPROVALS_SERVER_SUCCESS = 'ASSET_APPROVALS_SERVER_SUCCESS'
export const SHOW_ASSET_APPROVALS_ADD_FORM = 'SHOW_ASSET_APPROVALS_ADD_FORM'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const assetApprovalsRequest = () => ({
  type: ASSET_APPROVALS_REQUEST,
})

const assetApprovalsListSuccess = () => ({
  type: ASSET_APPROVALS_SERVER_SUCCESS,
})

export const assetApprovalsServerListSuccess = assetApprovalsList => ({
  type: ASSET_APPROVALS_SERVER_SUCCESS,
  assetApprovalsList: assetApprovalsList,
})

const assetApprovalsFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: ASSET_APPROVALS_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const assetApprovalAddUpdateStatus = (status) => ({
  type: ASSET_APPROVAL_ADD_UPDATE_STATUS,
  add_update_status: status
});

const assetApprovalsAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(assetApprovalsSuccessNotification(message))
  dispatch(assetApprovalAddUpdateStatus(true))
}

export const redirectToAssetApprovalsList = () => ({
  type: REDIRECT_TO_ASSET_APPROVALS_LIST,
})

export const showAssetApprovalAddForm = () => ({
  type: SHOW_ASSET_APPROVALS_ADD_FORM,
})

const getAssetApprovalsSuccess = (response, action) => ({
  type: ASSET_APPROVALS_GET_SUCCESS,
  record: response,
  actionType: action
})

const assetApprovalsSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideAssetApprovalsValidationError = (feild_key) => ({
  type: HIDE_ASSET_APPROVALS_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const addAssetApprovals = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetApprovalsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_approvals/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        assetApprovalsAddUpadteSuccess('Asset Approval Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateAssetApprovals = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetApprovalsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_approvals/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
    .then((response) => {
      assetApprovalsAddUpadteSuccess('Asset Approval Updated Successfully', 'update', dispatch)
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const getAssetApprovalsById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetApprovalsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_approvals/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getAssetApprovalsSuccess(response.data, action))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const rejectAssetApprovals = (assetApprovalIds, object_viewed_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(assetApprovalsRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "asset_approvals/reject", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data:{
        object_viewed_id: object_viewed_id,
        assetApprovalIds: assetApprovalIds
      }
    })
    .then((response) => {
      dispatch(assetApprovalsSuccessNotification('Asset Approvals rejected successfully'))
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
      dispatch(assetApprovalsFailure(err))
    }
  }
  catch (e) {
    dispatch(assetApprovalsFailure('Unable to perform action.Something went wrong'))
  }
}   