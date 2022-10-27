import * as actionTypes from 'actions';
import { isEmpty } from 'lodash';

const initialState = {
    Loading: false,
    assetTypesList: [],
    assetTypesRecord: [],
    validation_error: "",
    asset_type_id: "",
    asset_type_add_update_success: false,
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false
}

const AssetTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ASSET_TYPES_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ASSET_TYPES_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                assetTypesList: action.assetTypesList,
                showUpdateForm: false,
                showViewPage: false,
                assetTypesRecord: [],
                asset_type_id: "",
                asset_type_add_update_success: false
            }
        case actionTypes.ASSET_TYPES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                assetTypesRecord: [],
                asset_type_id: "",
                asset_type_add_update_success: false
            }
        case actionTypes.ASSET_TYPE_ADD_UPDATE_SUCCESS:
            return {
                ...state,
                Loading: false,
                asset_type_id: !isEmpty(action.asset_type_id) ? action.asset_type_id : state.asset_type_id,
                asset_type_add_update_success: !isEmpty(action.asset_type_id) ? true : false,
            }
        case actionTypes.SET_ASSET_TYPE_ID:
            return {
                ...state,
                Loading: false,
                asset_type_id: action.asset_type_id
            }
        case actionTypes.SET_ASSET_TYPE_ADD_UPDATE_STATUS_FALSE:
            return {
                ...state,
                asset_type_add_update_success: false,
            }
        case actionTypes.ASSET_TYPES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                assetTypesRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.ASSET_TYPES_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_ASSET_TYPES_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_ASSET_TYPES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                assetTypesRecord: [],
            }

        default:
            return state;
    }
}

export default AssetTypesReducer;