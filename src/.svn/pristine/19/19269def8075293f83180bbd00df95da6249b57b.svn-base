import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    purchaseOrdersList: [],
    purchaseOrdersRecord: [],
    addedPODetails: [],
    removedPODetails: [],
    purchaseOrdersStatusDropdownList: [],
    purchaseOrdersDetailsList: [],
    validation_error: "",
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const PurchaseOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_ORDERS_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.PURCHASE_ORDERS_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                showUpdateForm: false,
                showViewPage: false,
                purchaseOrdersRecord: [],
                addedPODetails: [],
                removedPODetails: [],
            }
        case actionTypes.PURCHASE_ORDERS_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: "",
                purchaseOrdersList: action.purchaseOrdersList,
                showUpdateForm: false,
                showViewPage: false,
                purchaseOrdersRecord: [],
                addedPODetails: [],
                removedPODetails: [],
            }
        case actionTypes.PURCHASE_ORDERS_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                purchaseOrdersRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.PURCHASE_ORDERS_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.ADD_REMOVE_PURCHASE_ORDER_DETAILS:
            return {
                ...state,
                addedPODetails: action.added_asset_details,
                removedPODetails: action.removed_asset_details
            }
        case actionTypes.PURCHASE_ORDERS_DETAILS_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                purchaseOrdersDetailsList: action.purchaseOrdersDetailsList,
            }
        case actionTypes.PURCHASE_ORDERS_STATUS_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                Loading: false,
                purchaseOrdersStatusDropdownList: action.purchaseOrdersStatusDropdownList,
            }
        case actionTypes.HIDE_PURCHASE_ORDERS_FEILD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.feild_key])
                delete state.validation_error[action.feild_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_PURCHASE_ORDERS_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                purchaseOrdersRecord: [],
                addedPODetails: [],
                removedPODetails: [],
            }
        default:
            return state;
    }
}

export default PurchaseOrdersReducer;