import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    designationCategoryList: [],
    designationCategoryParentList: [],
    designationCategoryRecord:[],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const DesignationCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
       
    case actionTypes.DESIGNATION_CATEGORY_REQUEST:
        return {
          ...state,
          Loading: true,
          validation_error: "",
          redirect_to_list: false,
        }
    case actionTypes.DESIGNATION_CATEGORY_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          designationCategoryList: action.designationCategoryList,
          showUpdateForm: false,
          showViewPage: false,
          designationCategoryRecord: [],
        }
    case actionTypes.DESIGNATION_CATEGORY_SERVER_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          showUpdateForm: false,
          showViewPage: false,
          designationCategoryRecord: [],
        }    
    case actionTypes.DESIGNATION_CATEGORY_PARENT_SUCCESS:
        return {
          ...state, 
          Loading: false,
          redirect_to_list: false,
          validation_error: "",
          designationCategoryParentsList: action.designationCategoryParentsList
        }    
    case actionTypes.DESIGNATION_CATEGORY_GET_SUCCESS:
        return {
            ...state, 
            Loading: false,
            redirect_to_list: false,
            designationCategoryRecord: action.record,
            showUpdateForm: (action.actionType === 'update')? true:false,
            showViewPage: (action.actionType === 'view')? true:false
        }    
    case actionTypes.DESIGNATION_CATEGORY_VALIDATION_ERROR:
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
        } 
    case actionTypes.HIDE_DESIGNATION_CATEGORY_FEILD_VALIDATION_ERROR:
        if(state.validation_error && state.validation_error[action.feild_key])
            delete state.validation_error[action.feild_key]
        return {
            ...state,
            Loading: false,
            redirect_to_list: false,
            validation_error: action.validation_error,
            
        } 
    case actionTypes.REDIRECT_TO_DESIGNATION_CATEGORY_LIST:
        return {
            ...state,
            redirect_to_list: true,
            showUpdateForm: false,
            showViewPage: false,
            validation_error: '',
            designationCategoryRecord: [],
        }        
    default:
        return state;
    }
}

export default DesignationCategoryReducer;
