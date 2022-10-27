import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    asset_attribute_validation_error: "",
    asset_attribute_add_update_status: false,
    assetAttributeList: [],
}

const AssetAttributeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ASSET_ATTRIBUTE_REQUEST:
            return {
                ...state,
                Loading: true,
                asset_attribute_validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.ASSET_ATTRIBUTE_VALIDATION_ERROR:
            return {
                ...state,
                asset_attribute_validation_error: action.asset_attribute_validation_error,
            }
        case actionTypes.HIDE_ASSET_ATTRIBUTE_FEILD_VALIDATION_ERROR:
            if (state.asset_attribute_validation_error && state.asset_attribute_validation_error[action.feild_key])
                delete state.asset_attribute_validation_error[action.feild_key]
            return {
                ...state,
                asset_attribute_validation_error: action.asset_attribute_validation_error,

            }
        case actionTypes.ASSET_ATTRIBUTE_ADD_UPDATE_STATUS:
            return {
                ...state,
                Loading: false,
                asset_attribute_add_update_status: action.asset_attribute_add_update_status,
            }
        case actionTypes.ASSET_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                asset_attribute_validation_error: "",
                asset_attribute_add_update_status: false,
                assetAttributeList: action.assetAttributeList,
            }
        default:
            return state;
    }
}

export default AssetAttributeReducer;