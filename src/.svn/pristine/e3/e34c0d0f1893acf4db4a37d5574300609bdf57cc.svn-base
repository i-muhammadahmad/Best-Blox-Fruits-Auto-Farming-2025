import * as actionTypes from 'actions';
import { isEmpty } from 'lodash';

const initialState = {
    Loading: false,
    quizSetupRecord: [],
    officeComplienceSummary: [],
    departmentComplienceSummary: [],
    redirect_to_list: false,
    showDeleteModel: false,
    showUpdateForm: false,
    showViewPage: false,
}

const ComplianceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPLIANCE_REQUEST:
            return {
                ...state,
                Loading: true,
                redirect_to_list: false,
            }
        case actionTypes.COMPLIANCE_COURSES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                showUpdateForm: false,
                showViewPage: false,
                quizSetupRecord: [],
            }
        case actionTypes.COMPLIANCE_COURSES_GET_SUCCESS:
            return {
                ...state,
                Loading: false,
                redirect_to_list: false,
                quizSetupRecord: action.record,
                showUpdateForm: (action.actionType === 'update') ? true : false,
                showViewPage: (action.actionType === 'view') ? true : false
            }
        case actionTypes.REDIRECT_TO_COMPLIANCE_COURSES_LIST:
            return {
                ...state,
                redirect_to_list: true,
                showUpdateForm: false,
                showViewPage: false,
                validation_error: '',
                quizSetupRecord: [],
            }
        case actionTypes.OFFICE_COMPLIENCE_SUMMARY_SUCCESS:
            return {
                ...state,
                Loading: false,
                officeComplienceSummary: action.officeComplienceSummary,
                departmentComplienceSummary: action.departmentComplienceSummary
            }   
        case actionTypes.COMPLIANCE_REPORT_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
            }  
        case actionTypes.MENDATORY_COURSES_SERVER_SUCCESS:
            return {
                ...state,
                Loading: false,
            }         
        default:
            return state;
    }
}

export default ComplianceReducer;