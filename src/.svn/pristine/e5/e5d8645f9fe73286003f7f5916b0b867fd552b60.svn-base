import axios from 'axios';
import { API_URL } from 'configs'
 
export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST'
export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_PROFILE_INFO_FEILD_VALIDATION_ERROR = "HIDE_PROFILE_INFO_FEILD_VALIDATION_ERROR"
export const PROFILE_INFO_VALIDATION_ERROR = 'PROFILE_INFO_VALIDATION_ERROR'
export const HIDE_PROFILE_TIMEZONE_FEILD_VALIDATION_ERROR = 'PROFILE_TIMEZONE_VALIDATION_ERROR'
export const PROFILE_TIMEZONE_VALIDATION_ERROR = 'PROFILE_TIMEZONE_VALIDATION_ERROR'
export const HIDE_PROFILE_IMAGE_FEILD_VALIDATION_ERROR = 'HIDE_PROFILE_IMAGE_FEILD_VALIDATION_ERROR'
export const PROFILE_IMAGE_VALIDATION_ERROR = 'HIDE_PROFILE_IMAGE_FEILD_VALIDATION_ERROR'
export const HIDE_PROFILE_PASSWORD_FEILD_VALIDATION_ERROR = 'HIDE_PROFILE_PASSWORD_FEILD_VALIDATION_ERROR'
export const PROFILE_PASSWORD_VALIDATION_ERROR = 'PROFILE_PASSWORD_VALIDATION_ERROR'
export const PROFILE_SHOW_VERIFY_CODE = 'PROFILE_SHOW_VERIFY_CODE'
export const PROFILE_HIDE_VERIFY_CODE = 'PROFILE_HIDE_VERIFY_CODE'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const showCommonLoader = (label = '') => ({
  type: SHOW_LOADER,
  common_loder_label: label
})
const hideCommonLoader = () => ({
  type: HIDE_LOADER,
})

const userProfileRequest = () => ({
  type: USER_PROFILE_REQUEST,
})

const ProfileFailure = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'general_error'
})

const tokenError = notification => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: notification,
  snackbar_notification_type: 'token_expire'
})

const userProfileSuccessNotification = message => ({
  type: SHOW_SNACKBAR,
  snackbar_notification: message,
  snackbar_notification_type: 'success'
})  

/* 
  Profile info methods
*/

const ProfileInfoValidationError = notification => ({
  type: PROFILE_INFO_VALIDATION_ERROR,
  profile_info_validation_error: notification,
})

export const hideProfileInfoValidationError = (feild_key) => ({
  type: HIDE_PROFILE_INFO_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const updateProfileInfo = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userProfileRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "userProfile/update/" + data.employee_id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(userProfileSuccessNotification('Profile Info Updated Successfully'))
        dispatch(updateProfileUserInfo(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleUserProfileErrorResponse(error, dispatch, ProfileInfoValidationError)
      });

  }
}

/* 
  profile timezone method
*/

const ProfileTimezoneValidationError = notification => ({
  type: PROFILE_TIMEZONE_VALIDATION_ERROR,
  profile_timezone_validation_error: notification,
})

export const hideProfileTimezoneValidationError = (feild_key) => ({
  type: HIDE_PROFILE_TIMEZONE_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const updateProfileTimezone = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userProfileRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "userProfile/updateTimezone/" + data.user_id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
      .then((response) => {
        dispatch(hideCommonLoader())
        dispatch(userProfileSuccessNotification('Timezone Updated Successfully'))
        dispatch(updateProfileUserInfo(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleUserProfileErrorResponse(error, dispatch, ProfileTimezoneValidationError)
      });

  }
}


/* 
  profile image method
*/

const ProfileImageValidationError = notification => ({
  type: PROFILE_IMAGE_VALIDATION_ERROR,
  profile_image_validation_error: notification,
})

export const hideProfileImageValidationError = (feild_key) => ({
  type: HIDE_PROFILE_IMAGE_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const updateProfileImage = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userProfileRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "userProfile/updateProfileImage/" + data.get('employee_id'), {
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
        dispatch(userProfileSuccessNotification('Profile Image Updated Successfully'))
        dispatch(updateProfileUserInfo(response.data))
      }, (error) => {
        dispatch(hideCommonLoader())
        handleUserProfileErrorResponse(error, dispatch, ProfileImageValidationError)
      });

  }
}

/* 
  profile password method
*/

const ProfilePasswordValidationError = notification => ({
  type: PROFILE_PASSWORD_VALIDATION_ERROR,
  profile_password_validation_error: notification,
})

export const hideProfilePasswordValidationError = (feild_key) => ({
  type: HIDE_PROFILE_PASSWORD_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})

export const hideProfilePasswordVerifyScreen = () => ({
  type: PROFILE_HIDE_VERIFY_CODE
})

const updatePasswordSuccess = () => ({
  type: PROFILE_SHOW_VERIFY_CODE
})

export const updateProfilePassword = (data) => { 
  var token = localStorage.getItem("token")
  return dispatch => {
    dispatch(userProfileRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + "userProfile/updatePasswordRequest/" + data.user_id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
    .then((response) => {
      dispatch(hideCommonLoader())
      dispatch(updatePasswordSuccess())
      //dispatch(userProfileSuccessNotification('Password Updated Successfully'))
    }, (error) => {
      dispatch(hideCommonLoader())
      handleUserProfileErrorResponse(error, dispatch, ProfilePasswordValidationError)
    });

  }
}

//send email varification code
export const profileEmailVerificationCode = (user_id, show_loader = true) => {
  return dispatch => {
    //dispatch(loginRequest())
    if(show_loader)
      dispatch(showCommonLoader())

    return axios(API_URL + 'resendCode', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        id: user_id
      }
    })
    .then((response) => {
      
      //localStorage.setItem("token", response.data.access_token)
      //dispatch(loginSuccess(response.data.user, response.data.user_Permissions, response.data.nested_menus, response.data.approval_notifications))
      //dispatch(showVarificationScreen(response.data.user));

      if(show_loader){
        dispatch(hideCommonLoader());
        dispatch(userProfileSuccessNotification('Verification Code send successfully'));
      }
    }, (error) => {
      if(show_loader){
        dispatch(hideCommonLoader())
      }
      handleUserProfileErrorResponse(error, dispatch)
    });

  }
}

//send email varification code
export const profileEmailVerifyCode = (data) => {
  var token = localStorage.getItem("token")
  return dispatch => {
    //dispatch(loginRequest())
    dispatch(showCommonLoader())
    return axios(API_URL + 'userProfile/profileVerifycode', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer  ' + token
      },
      data: data
    })
    .then((response) => {
      dispatch(hideProfilePasswordVerifyScreen())
      dispatch(userProfileSuccessNotification('Password Updated successfully'));
      //localStorage.setItem("token", response.data.access_token)
      //dispatch(loginSuccess(response.data.user, response.data.user_Permissions, response.data.nested_menus, response.data.approval_notifications))
      //dispatch(showVarificationScreen(response.data.user));
      dispatch(hideCommonLoader())
    }, (error) => {
      dispatch(hideCommonLoader())
      handleUserProfileErrorResponse(error, dispatch)
    });

  }
}

//update user info UPDATE_USER_INFO
export const updateProfileUserInfo = (user) => ({
  type: UPDATE_USER_INFO,
  updated_user: user
})

// handling error reponse   
const handleUserProfileErrorResponse = (error, dispatch, validationErrorFunc) => {
  try {
    if (error.response.status === 422 && error.response.data.error) {
      dispatch(validationErrorFunc(error.response.data.error))
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
      dispatch(ProfileFailure(err))
    }
  }
  catch (e) {
    dispatch(ProfileFailure('Unable to perform action.Something went wrong'))
  }
}   
