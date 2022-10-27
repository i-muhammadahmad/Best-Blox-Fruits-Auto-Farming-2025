import * as actionTypes from 'actions';

const initialState = {
  loggedIn: false,
  user: {},
  loginLoading: false,
  error: "",
  error_type: "",
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState
      };
    }
    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {},
        loginLoading: false,
        error: "",
        error_type:''
      };
    }
    case actionTypes.LOGIN_REQUEST:
        return {
          ...state,
          loginLoading: true,
          error: "",
          error_type:'',
          user:[],
        }
    case actionTypes.LOGIN_SUCCESS:
    
        return {
          ...state, 
          loginLoading: false,
          user: action.payload,
          error: "",
          loggedIn: true,
          error_type: '',
        }
    case actionTypes.LOGIN_FAILURE:
        return {
            ...state,
          loginLoading: false,
          user: [],
          error: action.payload,
          error_type: action.error_type,
        }   
    case actionTypes.HIDE_ERROR:
        return {
            ...state,
          loginLoading: false,
          user: [],
          error: '',
          error_type: '',
        }
    case actionTypes.HIDE_FEILD_VALIDATION_ERROR:
        delete state.error[action.feild_key]
        return {
            ...state,
          loginLoading: false,
          user: [],
          error: state.error
        }
    case actionTypes.TOKEN_EXPIRE:
        return {
             ...state,
             loggedIn: false,
             user: [],
        }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
