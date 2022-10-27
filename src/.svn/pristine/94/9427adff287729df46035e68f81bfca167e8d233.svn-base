import axios from 'axios';
import { API_URL } from 'configs'
import { isEmpty } from 'lodash'

export const COMPLIANCE_REQUEST = 'COMPLIANCE_REQUEST'
export const COMPLIANCE_SUCCESS = 'COMPLIANCE_SUCCESS'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const REDIRECT_TO_COMPLIANCE_COURSES_LIST = 'REDIRECT_TO_COMPLIANCE_COURSES_LIST'
export const COMPLIANCE_COURSES_GET_SUCCESS = 'COMPLIANCE_COURSES_GET_SUCCESS'

export const COMPLIANCE_COURSES_SERVER_SUCCESS = 'COMPLIANCE_COURSES_SERVER_SUCCESS'
export const MENDATORY_COURSES_SERVER_SUCCESS = 'MENDATORY_COURSES_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const complianceRequest = () => ({
  type: COMPLIANCE_REQUEST,
})

export const complianceCoursesServerListSuccess = () => ({
  type: COMPLIANCE_COURSES_SERVER_SUCCESS,
})

export const mendatoryCoursesServerListSuccess = () => ({
  type: MENDATORY_COURSES_SERVER_SUCCESS,
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const complianceFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

export const redirectToComplianceCoursesList = () => ({
  type: REDIRECT_TO_COMPLIANCE_COURSES_LIST,
})

const getComplianceCoursesSuccess = (response, action) => ({
  type: COMPLIANCE_COURSES_GET_SUCCESS,
  record: response,
  actionType: action
})

const complianceCoursesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const getComplianceCoursesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(complianceRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "quiz/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(getComplianceCoursesSuccess(response.data, action))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

/*
 * Start Compliance dashboard actions 
*/

export const OFFICE_COMPLIENCE_SUMMARY_SUCCESS = 'OFFICE_COMPLIENCE_SUMMARY_SUCCESS';
export const getofficeComplienceSummary = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(complianceRequest())
    return axios(API_URL + "dashboard/getOfficeComplienceSummary", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => {
      dispatch(officeComplienceSummarySuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

const officeComplienceSummarySuccess = responseData => ({
  type: OFFICE_COMPLIENCE_SUMMARY_SUCCESS,
  officeComplienceSummary: responseData.dashboard_office,
  departmentComplienceSummary: responseData.dashboard_department
})
/*
 * END Compliance dashboard actions 
*/



/*
*  Start Compliance Report Actions
*/
export const COMPLIANCE_REPORT_SERVER_SUCCESS = 'COMPLIANCE_REPORT_SERVER_SUCCESS';

export const complianceReportServerListSuccess = () => ({
  type: COMPLIANCE_REPORT_SERVER_SUCCESS,
})

/*
*  End Compliance Report Actions
*/


// handling error reponse   
const handleErrorResponse = (error, dispatch) => {
  try {
    if (error.response.status === 422 && error.response.data.error) {
      //dispatch(validationError(error.response.data.error))
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
      dispatch(complianceFailure(err))
    }
  }
  catch (e) {
    dispatch(complianceFailure('Unable to perform action.Something went wrong'))
  }
}

