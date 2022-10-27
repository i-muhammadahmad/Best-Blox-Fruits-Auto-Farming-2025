import axios from 'axios';
import { API_URL } from 'configs'
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const END_TIMER = 'END_TIMER';
export const RESUME_TIMER = 'RESUME_TIMER';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const UPDATE_ACTVECAM = 'UPDATE_ACTVECAM';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const TAKE_PHOTO = 'TAKE_PHOTO';
export const STORE_IP = 'STORE_IP';
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const CLOCKIN_VALIDATION_ERROR = 'CLOCKIN_VALIDATION_ERROR';
export const SET_LOG_ENTRIES = 'SET_LOG_ENTRIES';
export const CHANGE_INITIAL_STATE = 'CHANGE_INITIAL_STATE';
export const CHANGE_INITIAL_STATE_ON_BREAK = 'CHANGE_INITIAL_STATE_ON_BREAK';
export const CLOCKIN_SUMMARY_SUCCESS = 'CLOCKIN_SUMMARY_SUCCESS';
export const HIDE_SUMMARY_MODEL = 'HIDE_SUMMARY_MODEL';

export const handleStartTimer = () => ({
  type: START_TIMER
})
export const handleStopTimer = () => ({
  type: STOP_TIMER
})
export const handlePauseTimer = () => ({
  type: PAUSE_TIMER
})
export const handleUpdateTimer = () => ({
  type: UPDATE_TIMER
});
export const handleUpdateActiveCam = () => ({
  type: UPDATE_ACTVECAM
});
export const handleEndTimer = () => ({
  type: END_TIMER
});
export const handleTakePicture = () => ({
  type: TAKE_PHOTO
});

const clockinFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})
const validationError = notification => ({
  type: CLOCKIN_VALIDATION_ERROR,
  validation_error: notification,
})
const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

export const getGeoLocation = () => {
  return dispatch => {
    return axios("https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        dispatch(setgeoData(response));
      }, (error) => {
        handleErrorResponse(error, dispatch)
      });

  }
}

const setgeoData = (data) => ({
  type: STORE_IP,
  details: data
});

//get  clockin summary
export const getClockInSummary = () => {
  var token = localStorage.getItem("token");
  return dispatch => {
    return axios(API_URL + "clockin/getClockinSummary", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => {
      dispatch(clockInSummarySuccess(response.data));
    }, (error) => {
      handleErrorResponse(error, dispatch)
    });

  }
}

const clockInSummarySuccess = (clockInSummary) => ({
  type: CLOCKIN_SUMMARY_SUCCESS,
  clockInSummary: clockInSummary
});

export const closeSummaryModel = () => ({
  type: HIDE_SUMMARY_MODEL,
});

//Get Logged Entries
export const getLoggedEntries = () => {
  var token = localStorage.getItem("token");
  return dispatch => {
    //dispatch(activityCategoryRequest())
    return axios(API_URL + "clockin/getAllClockin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        dispatch(setLoggedEntries(response));
      }, (error) => {
        handleErrorResponse(error, dispatch)
      });

  }
}

//Get Latest Entry from database
export const getLatestClockinEntry = () => {
  var token = localStorage.getItem("token");
  return dispatch => {
    return axios(API_URL + "clockin/getLatestClockinEntry", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then((response) => {
        if(response.data.length > 0){
          if (response.data[0].status === 'At Desk') {
            let now = new Date();
            let toTime = new Date(new Date(now.getTime() + now.getTimezoneOffset() * 60000).toUTCString());
            let fromTime = new Date(response.data[0].clockin_date + ' ' + response.data[0].clockin_timefrom);
            var differenceTravel = new Date(toTime).getTime() - new Date(fromTime).getTime();
            var seconds_now = Math.floor((differenceTravel) / (1000));
            let total_time = response.data[0].total_time;
            let a = total_time.split(':');
            var pre_seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  
            var total_seconds = seconds_now + pre_seconds;
            dispatch(changeInitialState(total_seconds));
          } else if (response.data[0].status !== 'At Desk' && response.data[0].status !== 'End Timer') {
            let total_time = response.data[0].total_time;
            let a = total_time.split(':'); // split it at the colons
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            dispatch(changeInitialStateOnBreak(seconds));
          } else {
  
          }
        }else{

        }
        // dispatch(setLoggedEntries(response));
      }, (error) => {
        handleErrorResponse(error, dispatch)
      });

  }
}

//Change initial state if tab was closed/reload

const changeInitialState = (data) => ({
  type: CHANGE_INITIAL_STATE,
  details: data
});

// Change initial state while user is on break:
const changeInitialStateOnBreak = (data) => ({
  type: CHANGE_INITIAL_STATE_ON_BREAK,
  details: data
});

// Set State for Loggged Entries

const setLoggedEntries = (data) => ({
  type: SET_LOG_ENTRIES,
  details: data
});

//End Timer

export const startTimer = (data) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    //dispatch(activityCategoryRequest())
    return axios(API_URL + "clockin/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data,
    })
    .then((response) => {
      dispatch(getLoggedEntries());
    }, (error) => {
      handleErrorResponse(error, dispatch)
    });
  }
}
//stop Timer

export const stopTimer = (data) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    //dispatch(activityCategoryRequest())
    return axios(API_URL + "clockin/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { imgsrc: data },
    })
      .then((response) => {
        alert('success');//activityCategoryAddUpadteSuccess('Activity Category Added Successfully','create',dispatch)
      }, (error) => {
        handleErrorResponse(error, dispatch)
      });

  }
}
//Functions for Start Shift
export const endTimer = (data) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    //dispatch(activityCategoryRequest())
    return axios(API_URL + "clockin/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { imgsrc: data },
    })
      .then((response) => {
        alert('success');//activityCategoryAddUpadteSuccess('Activity Category Added Successfully','create',dispatch)
      }, (error) => {
        handleErrorResponse(error, dispatch)
      });

  }
}

//Functions for uploading /inserting records
export const addImage = (imageSrc) => {
  var token = localStorage.getItem("token");
  return dispatch => {
    return axios(API_URL + "clockin/uploadimage", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: { imgsrc: imageSrc },
    })
    .then((response) => {
      //Successfully uploaded
    }, (error) => {
      handleErrorResponse(error, dispatch);
    });
  }
}

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
      dispatch(clockinFailure(err))
    }
  }
  catch (e) {
    dispatch(clockinFailure('Unable to perform action.Something went wrong'))
  }
}   
