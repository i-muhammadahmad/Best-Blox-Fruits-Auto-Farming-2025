import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    usersList: [],
    usersDropdownList: [],
    usersRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.USERS_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.USERS_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          usersRecord: [],
        }      
    case actionTypes.USERS_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          usersList: action.usersList,
          showUpdateForm: false,
          showViewPage: false,
          usersRecord: [],
        }    
    case actionTypes.USERS_DROPDOWN_LIST_SUCCESS:
        return {
            ...state,
            Loading: false,
            usersDropdownList: action.usersDropdownList,
        }    
    case actionTypes.USERS_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            usersRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.USERS_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_USERS_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_USERS_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            usersRecord: [],
        }        
    default:
        return state;
    }
}

export default UsersReducer;