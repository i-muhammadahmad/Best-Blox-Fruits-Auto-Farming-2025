import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    profile_info_validation_error: "",
    profile_timezone_validation_error: '',
    profile_password_validation_error: '',
    profile_show_verify_code: false
}

const UserProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_REQUEST:
            return {
                ...state,
                Loading: true,
                profile_info_validation_error: "",
            }
        //profile info    
        case actionTypes.PROFILE_INFO_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                profile_info_validation_error: action.profile_info_validation_error,
            }
        case actionTypes.HIDE_PROFILE_INFO_FEILD_VALIDATION_ERROR:
            if (state.profile_info_validation_error && state.profile_info_validation_error[action.feild_key])
                delete state.profile_info_validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                profile_info_validation_error: action.profile_info_validation_error,

            }
        
        //timezone
        case actionTypes.PROFILE_TIMEZONE_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                profile_timezone_validation_error: action.profile_timezone_validation_error,
            }
        case actionTypes.HIDE_PROFILE_TIMEZONE_FEILD_VALIDATION_ERROR:
            if (state.profile_timezone_validation_error && state.profile_timezone_validation_error[action.feild_key])
                delete state.profile_timezone_validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                profile_timezone_validation_error: action.profile_timezone_validation_error,

            }

        //profile image
        case actionTypes.PROFILE_IMAGE_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                profile_image_validation_error: action.profile_image_validation_error,
            }
        case actionTypes.HIDE_PROFILE_IMAGE_FEILD_VALIDATION_ERROR:
            if (state.profile_image_validation_error && state.profile_image_validation_error[action.feild_key])
                delete state.profile_image_validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                profile_image_validation_error: action.profile_image_validation_error,

            }

        //profile password
        case actionTypes.PROFILE_PASSWORD_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                profile_password_validation_error: action.profile_password_validation_error,
                profile_show_verify_code: false,
            }
        case actionTypes.HIDE_PROFILE_PASSWORD_FEILD_VALIDATION_ERROR:
            if (state.profile_password_validation_error && state.profile_password_validation_error[action.feild_key])
                delete state.profile_password_validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                profile_password_validation_error: action.profile_password_validation_error,

            }   
        case actionTypes.PROFILE_SHOW_VERIFY_CODE:
            return {
                ...state,
                Loading: false,
                profile_show_verify_code: true,
            } 
        case actionTypes.PROFILE_HIDE_VERIFY_CODE:
            return {
                ...state,
                Loading: false,
                profile_show_verify_code: false,
            }         

        default:
            return state;
    }
}

export default UserProfileReducer;