import axios from 'axios';
import { API_URL } from 'configs'
import { isEmpty } from 'lodash'

export const QUIZ_REQUEST = 'QUIZ_REQUEST'
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS'
export const QUIZ_VALIDATION_ERROR = 'QUIZ_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_QUIZ_FEILD_VALIDATION_ERROR = "HIDE_QUIZ_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_QUIZ_LIST = 'REDIRECT_TO_QUIZ_LIST'
export const QUIZ_GET_SUCCESS = 'QUIZ_GET_SUCCESS'
export const SET_BINDING_ID = 'SET_BINDING_ID'
export const SET_CERTIFICATE_PATH = 'SET_CERTIFICATE_PATH'
export const SET_QUIZ_STATUS = 'SET_QUIZ_STATUS'
export const QUIZ_SERVER_SUCCESS = 'QUIZ_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const quizRequest = () => ({
  type: QUIZ_REQUEST,
})

export const quizServerListSuccess = () => ({
  type: QUIZ_SERVER_SUCCESS,
})

const quizListSuccess = bindedQuizList => ({
  type: QUIZ_SUCCESS,
  bindedQuizList: bindedQuizList,
})

const setQuizCertificate = data => ({
  type: SET_CERTIFICATE_PATH,
  certificate_path: data.certificate_path,
})

const setQuizAttempStatus = data => ({
  type: SET_QUIZ_STATUS,
  quiz_attemp_status: data.status,
  scoring_percentage: data.scoring_percentage,
})

const handleQuizResponse = (dispatch, res) => {

  if (res.status === 'pass') {
    dispatch(setQuizCertificate(res))
  }
  dispatch(setQuizAttempStatus(res))
}

const quizFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: QUIZ_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const setBindingId = binding_id => ({
  type: SET_BINDING_ID,
  binding_id: binding_id
});

const quizAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(quizSuccessNotification(message))
  dispatch(redirectToQuizList())
}

export const redirectToQuizList = () => ({
  type: REDIRECT_TO_QUIZ_LIST,
})

const getQuizSuccess = (response, action) => ({
  type: QUIZ_GET_SUCCESS,
  record: response,
  actionType: action
})

const quizSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})



export const hideQuizValidationError = (feild_key) => ({
  type: HIDE_QUIZ_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const bindedQuizListFetch = () => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(quizRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "quiz/getAllBinded", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(quizListSuccess(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });

  }
}

export const getQuizById = (id, binding_id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(quizRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "quiz/getDetailsById/" + id + '/' + binding_id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
      .then((response) => {
        dispatch(setBindingId(binding_id));

        if (!isEmpty(response.data.quiz_response)) {
          if (response.data.quiz_response[0].is_passed == 1) {
            dispatch(setQuizCertificate(response.data.quiz_response[0]))
          }
        }
        dispatch(getQuizSuccess(response.data, action));
        dispatch(hideCommonLoader())
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch);
      });
  }
}

// save quiz user response 
export const saveQuizResponse = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(showCommonLoader())
    dispatch(quizRequest())
    return axios(API_URL + "quiz/saveQuizUserResponse", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        //dispatch(setQuizCertificate(response.data))
        handleQuizResponse(dispatch, response.data);
        dispatch(hideCommonLoader())
        dispatch(quizSuccessNotification('Course Submitted Successfully'))
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
      dispatch(quizFailure(err))
    }
  }
  catch (e) {
    dispatch(quizFailure('Unable to perform action.Something went wrong'))
  }
}   