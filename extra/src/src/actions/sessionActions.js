import axios from 'axios';
import {Membership_API_URL} from 'configs';
//const Membership_API_URL = 'http://ims.premierbpo.net/MIS/Membership/';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const HIDE_ERROR = 'HIDE_ERROR';
export const HIDE_FEILD_VALIDATION_ERROR = 'HIDE_FEILD_VALIDATION_ERROR';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';

export const login = () => dispatch =>
  dispatch({
    type: SESSION_LOGIN
  });

export const logout = () => dispatch =>
  dispatch({
    type: SESSION_LOGOUT
  });

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const loginSuccess = (userObj) => ({
  type: LOGIN_SUCCESS,
  payload: userObj,
}) 

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error,
    error_type: 'general'
})
  
const validationError = error => ({
  type: LOGIN_FAILURE,
  payload: error,
  error_type: 'validation'
})


export const hideError = () => ({
  type: HIDE_ERROR,
})

export const hideFeildValidationError = (feild_key) => ({
  type: HIDE_FEILD_VALIDATION_ERROR,
  feild_key: feild_key
})
  
export const userLoginFetch = user => {
    return dispatch => {
      dispatch(loginRequest())
      return axios(Membership_API_URL+'login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: user
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access_token)
        dispatch(loginSuccess(response.data.user))
      }, (error) => {
        handleErrorResponse(error,dispatch)
      });
        
    }
  }
  
   
const handleErrorResponse = (error,dispatch) => {
  try{
    if(error.response.status === 422){
      dispatch(validationError(error.response.data.error))
    }
    else{
      let err = '';
      if(error.response.data.error){
        err = error.response.data.error.toString();
      }
      else{
        err = error.response.status+` `+error.response.statusText
      }
      dispatch(loginFailure(err))
    }
  }
  catch(e){
    dispatch(loginFailure('Unable to perform action.Something went wrong'))
  }  
} 