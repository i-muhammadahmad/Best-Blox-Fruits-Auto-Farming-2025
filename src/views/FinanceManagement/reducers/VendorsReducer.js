import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    vendorsList: [],
    vendorsDropdownList: [],
    vendorsRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const VendorsReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.VENDORS_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.VENDORS_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          vendorsRecord: [],
        }      
    case actionTypes.VENDORS_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          vendorsList: action.vendorsList,
          showUpdateForm: false,
          showViewPage: false,
          vendorsRecord: [],
        }    
    case actionTypes.VENDORS_DROPDOWN_LIST_SUCCESS:
        return {
            ...state,
            Loading: false,
            vendorsDropdownList: action.vendorsDropdownList,
        }    
    case actionTypes.VENDORS_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            vendorsRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.VENDORS_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_VENDORS_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_VENDORS_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            vendorsRecord: [],
        }        
    default:
        return state;
    }
}

export default VendorsReducer;