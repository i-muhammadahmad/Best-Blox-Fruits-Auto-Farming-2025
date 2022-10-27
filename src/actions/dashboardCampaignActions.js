import axios from 'axios';
import { API_URL } from 'configs'
export const CAMPAIGN_DASHBOARD_REQUEST = 'CAMPAIGN_DASHBOARD_REQUEST'
export const CAMPAIGN_SUMMARY_SUCCESS = 'CAMPAIGN_SUMMARY_SUCCESS'
export const CAMPAIGN_DASHBOARD_VALIDATION_ERROR = 'CAMPAIGN_DASHBOARD_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const campaignDashboardRequest = () => ({
  type: CAMPAIGN_DASHBOARD_REQUEST,
})

const campaignSummarySuccess = campaignSummary => ({
  type: CAMPAIGN_SUMMARY_SUCCESS,
  campaignSummary: campaignSummary,
})

const campaignDashboardFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: CAMPAIGN_DASHBOARD_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const campaignDashboardSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const campaignSummaryFetch = (form_fields) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(campaignDashboardRequest())
    return axios(API_URL + "dashboard/getCampaignSummary/" + form_fields.client_id, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { ...form_fields }
    })
    .then((response) => {
      dispatch(campaignSummarySuccess(response.data))
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
      dispatch(campaignDashboardFailure(err))
    }
  }
  catch (e) {
    dispatch(campaignDashboardFailure('Unable to perform action.Something went wrong'))
  }
}   