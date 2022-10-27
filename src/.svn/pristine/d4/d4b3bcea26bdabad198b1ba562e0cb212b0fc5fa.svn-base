import axios from 'axios';
import { API_URL } from 'configs'

export const MEETING_NOTES_REQUEST = 'MEETING_NOTES_REQUEST'
export const MEETING_NOTES_SUCCESS = 'MEETING_NOTES_SUCCESS'
export const MEETING_NOTES_VALIDATION_ERROR = 'MEETING_NOTES_VALIDATION_ERROR'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_MEETING_NOTES_FEILD_VALIDATION_ERROR = "HIDE_MEETING_NOTES_FEILD_VALIDATION_ERROR"
export const REDIRECT_TO_MEETING_NOTES_LIST = 'REDIRECT_TO_MEETING_NOTES_LIST'
export const MEETING_NOTES_GET_SUCCESS = 'MEETING_NOTES_GET_SUCCESS'
export const MEETING_NOTE_ADD_UPDATE_STATUS = 'MEETING_NOTE_ADD_UPDATE_STATUS'
export const MEETING_NOTES_SERVER_SUCCESS = 'MEETING_NOTES_SERVER_SUCCESS'
export const SHOW_MEETING_NOTES_ADD_FORM = 'SHOW_MEETING_NOTES_ADD_FORM'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const meetingNotesRequest = () => ({
  type: MEETING_NOTES_REQUEST,
})

const meetingNotesListSuccess = () => ({
  type: MEETING_NOTES_SERVER_SUCCESS,
})

export const meetingNotesServerListSuccess = meetingNotesList => ({
  type: MEETING_NOTES_SERVER_SUCCESS,
  meetingNotesList: meetingNotesList,
})

const meetingNotesFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: MEETING_NOTES_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const meetingNoteAddUpdateStatus = (status) => ({
  type: MEETING_NOTE_ADD_UPDATE_STATUS,
  add_update_status: status
});

const meetingNotesAddUpadteSuccess = (message, action, dispatch) => {
  dispatch(meetingNotesSuccessNotification(message))
  dispatch(meetingNoteAddUpdateStatus(true))
}

export const redirectToMeetingNotesList = () => ({
  type: REDIRECT_TO_MEETING_NOTES_LIST,
})

export const showMeetingNoteAddForm = () => ({
  type: SHOW_MEETING_NOTES_ADD_FORM,
})

const getMeetingNotesSuccess = (response, action) => ({
  type: MEETING_NOTES_GET_SUCCESS,
  record: response,
  actionType: action
})

const meetingNotesSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})


export const hideMeetingNotesValidationError = (feild_key) => ({
  type: HIDE_MEETING_NOTES_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const meetingNotesListFetch = (client_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(meetingNotesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "meeting_notes/getByAttributes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        "client_id": client_id
      }
    })
    .then((response) => {
      dispatch(meetingNotesListSuccess(response.data))
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const addMeetingNotes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(meetingNotesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "meeting_notes/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
      .then((response) => {
        meetingNotesAddUpadteSuccess('Meeting Note Added Successfully', 'create', dispatch)
        dispatch(hideCommonLoader())
      }, (error) => {
        handleErrorResponse(error, dispatch)
        dispatch(hideCommonLoader())
      });

  }
}

export const updateMeetingNotes = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(meetingNotesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "meeting_notes/update/" + data.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
    .then((response) => {
      meetingNotesAddUpadteSuccess('Meeting Note Updated Successfully', 'update', dispatch)
      dispatch(hideCommonLoader())
    }, (error) => {
      handleErrorResponse(error, dispatch)
      dispatch(hideCommonLoader())
    });

  }
}

export const getMeetingNotesById = (id, action) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(meetingNotesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "meeting_notes/getById/" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(getMeetingNotesSuccess(response.data, action))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleErrorResponse(error, dispatch)
    });

  }
}

export const deleteMeetingNotes = (meetingNotesId, object_viewed_id, client_id) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(meetingNotesRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "meeting_notes/delete/" + meetingNotesId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data:{
        object_viewed_id
      }
    })
    .then((response) => {
      dispatch(meetingNotesSuccessNotification('Meeting Note deleted successfully'))
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
      dispatch(meetingNotesFailure(err))
    }
  }
  catch (e) {
    dispatch(meetingNotesFailure('Unable to perform action.Something went wrong'))
  }
}   