import axios from 'axios';
import { API_URL } from 'configs';
import { find } from 'lodash';

export const TRANSCRIBE_JOB_REQUEST = 'TRANSCRIBE_JOB_REQUEST'
export const TRANSCRIBE_JOB_SUCCESS = 'TRANSCRIBE_JOB_SUCCESS'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const REDIRECT_TO_TRANSCRIBE_JOB_LIST = 'REDIRECT_TO_TRANSCRIBE_JOB_LIST'
export const TRANSCRIBE_JOB_GET_SUCCESS = 'TRANSCRIBE_JOB_GET_SUCCESS'
export const TRANSCRIBE_JOB_VALIDATION_ERROR = 'TRANSCRIBE_JOB_VALIDATION_ERROR';
export const TOGGLE_TRANSCRIBE_JOB_VIEW_MODAL = 'TOGGLE_TRANSCRIBE_JOB_VIEW_MODAL';
export const SET_TRANSCRIBE_JOB_DETAIL_AUDIO_FILE_PATH = 'SET_TRANSCRIBE_JOB_DETAIL_AUDIO_FILE_PATH'
export const TRANSCRIBE_JOB_SERVER_SUCCESS = 'TRANSCRIBE_JOB_SERVER_SUCCESS'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const transcribeJobRequest = () => ({
  type: TRANSCRIBE_JOB_REQUEST,
})

export const transcribeJobServerListSuccess = () => ({
  type: TRANSCRIBE_JOB_SERVER_SUCCESS,
})

const transcribeJobListSuccess = transcribeJobList => ({
  type: TRANSCRIBE_JOB_SUCCESS,
  transcribeJobList: transcribeJobList,
})

const transcribeJobFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: TRANSCRIBE_JOB_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const redirectToTranscribeJobList = () => ({
  type: REDIRECT_TO_TRANSCRIBE_JOB_LIST,
})

const getTranscribeJobSuccess = (response, action) => ({
  type: TRANSCRIBE_JOB_GET_SUCCESS,
  record: response,
  actionType: action
})

const transcribeJobSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})

export const transcribeJobListFetch = (object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeJobRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_job/getAll", {
      method: "GET",
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
        dispatch(transcribeJobListSuccess(response.data))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

export const getTranscribeJobById = (id, action, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeJobRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_job/getById/" + id, {
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
        dispatch(getTranscribeJobSuccess(response.data, action))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleErrorResponse(error, dispatch)
      });
  }
}

//get job deatil by id
export const getTranscribeJobDetailsById = (value) => {
  return dispatch => {
    //const item = find(transcribeJobDetails, ['id', id]);
    dispatch(toggleTranscribeJobDetailsViewModel(value))
  }
}

export const toggleTranscribeJobDetailsViewModel = (jobDetailRecord = []) => ({
  type: TOGGLE_TRANSCRIBE_JOB_VIEW_MODAL,
  jobDetailRecord: jobDetailRecord
})

//dowload job file
export const downloadJobDetailAudio = (job_detail_id, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeJobRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "transcribe_job/downloadAudio/" + job_detail_id, {
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
        dispatch(downloadJobDetailAudioSuccess(response.data))
        dispatch(transcribeJobSuccessNotification('Audio File is downloaded successfully'))
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });
  }
}

const downloadJobDetailAudioSuccess = (response) => ({
  type: SET_TRANSCRIBE_JOB_DETAIL_AUDIO_FILE_PATH,
  audio_file_path: response.audio_file_path,
})

export const deleteJobDetailAudio = (file_path, object_viewed_id = '') => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(transcribeJobRequest())
    return axios(API_URL + "transcribe_job/unlinkJobDetailAudio", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: {
        file_path: file_path
      }
    })
      .then((response) => {
        dispatch(deleteJobDetailAudioSuccess())
      }, (error) => {
        dispatch(deleteJobDetailAudioSuccess())
      });
  }
}

const deleteJobDetailAudioSuccess = (response) => ({
  type: SET_TRANSCRIBE_JOB_DETAIL_AUDIO_FILE_PATH,
  audio_file_path: '',
})

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
      dispatch(transcribeJobFailure(err))
    }
  }
  catch (e) {
    dispatch(transcribeJobFailure('Unable to perform action.Something went wrong'))
  }
}   