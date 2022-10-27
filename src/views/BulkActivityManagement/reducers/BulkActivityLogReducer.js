import * as actionTypes from 'actions';

const initialState = {
    Loading: false,
    bulkActivityLogRecord: [],
    bulkActivitySetupByClient: [],
    validation_error: "",
    redirect_to_list: false,
    is_file_uploded: false,
    file_headers: [],
    file_total_records: '',
    total_request: 1,
    total_request_process: 0,
    file_name: '',
    file_contain_header: '',
    chunkSize: 100000
}

const BulkActivityLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BULK_ACTIVITY_LOG_REQUEST:
            return {
                ...state,
                Loading: true,
                validation_error: "",
                redirect_to_list: false,
            }
        case actionTypes.BULK_SETUP_BY_CLIENT_SUCCESS:
            return {
                ...state,
                Loading: false,
                bulkActivitySetupByClient: action.bulkSetupList,
            }
        case actionTypes.BULK_ACTIVITY_LOG_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                bulkActivityLogRecord: action.record,
            }
        case actionTypes.BULK_ACTIVITY_FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                Loading: false,
                is_file_uploded: true,
                file_headers: action.record.header,
                file_total_records: action.record.record_count,
                total_request: (action.record.record_count > state.chunkSize) ? Math.ceil(action.record.record_count / state.chunkSize) : 1,
                file_name: action.record.file_name,
                file_contain_header: action.record.contain_header

            }
        case actionTypes.BULK_ACTIVITY_LOG_VALIDATION_ERROR:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,
            }
        case actionTypes.HIDE_BULK_ACTIVITY_LOG_FIELD_VALIDATION_ERROR:
            if (state.validation_error && state.validation_error[action.field_key])
                delete state.validation_error[action.field_key]
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                validation_error: action.validation_error,

            }
        case actionTypes.REDIRECT_TO_BULK_ACTIVITY_LOG:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewModel: false,
                validation_error: '',
                bulkActivityLogRecord: [],
                is_file_uploded: false,
                file_headers: [],
                file_total_records: '',
                total_request: 1,
                total_request_process: 0,
                file_name: '',
                file_contain_header: '',
            }
        case actionTypes.UPADTE_REQUEST_PROCESS_COUNT:
            return {
                ...state,
                total_request_process: parseInt(state.total_request_process) + 1
            }
        default:
            return state;
    }
}
export default BulkActivityLogReducer;