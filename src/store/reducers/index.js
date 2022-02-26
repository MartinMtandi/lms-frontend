import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fetchLoansReducer from './fetchLoansReducer';
import statisticsReducer from './statisticsReducer';
import loanStatsReducer from './loanStatsReducer';
import customerStatsReducer from './customerStatsReducer';
import getClientsReducer from './getClientsReducer';
import createClientsReducer from './createClientsReducer';
import createLoanReducer from './createLoanReducer';
import getOrganisationsReducer from './getOrganisationsReducer';
import getCustomersReducer from './getCustomersReducer';
import creditAssessmentReducer from './creditAssessmentReducer';
import createCustomersReducer from './createCustomersReducer';
import loanTypesReducer from './loanTypesReducer';
import productReducer from './productReducer';
import nextofkinReducer from './nexofkinReducer';
import loanStructureReducer from './loanStructureReducer';
import getLoansReducer from './getLoansReducer';
import addProductReducer from './addProductReducer';
import getRepaymentsReducer from './getRepaymentsReducer';
import makeRepaymentsReducer from './makeRepaymentsReducer';
import customerLoanReducer from './customerLoanReducer';
import bulkLoansUploadsReducer from './bulkLoansUploadsReducer';
import bulkRepaymentsUploadReducer from './bulkRepaymentsUploadReducer';
import getAgentsReducer from './getAgentsReducer';
import createAgentReducer from './createAgentReducer';
import getReportsReducer from './getReportsReducer';
import getMinistriesReducer from './getMinistriesReducer';
import createFieldAgentReducer from './createFieldAgentReducer';
import getFieldAgentsReducer from './getFieldAgentsReducer';
import updateFieldAgentReducer from './updateFieldAgentReducer';
import suspendFieldAgentReducer from './suspendFieldAgentReducer';
import activateFieldAgentReducer from './activateFieldAgentReducer';
import fieldAgentLoansReducer from './fieldAgentLoansReducer';
import loanDetailsReducer from './loanDetailsReducer';
import preAssessmentReducer from './preAssessmentReducer';
import clientBusinessRulesReducer from './clientBusinessRulesReducer';
import updateBusinessRulesReducer from './updateBusinessRulesReducer';

export default combineReducers({
    authReducer,
    fetchLoansReducer,
    statisticsReducer,
    loanStatsReducer,
    customerStatsReducer,
    getClientsReducer,
    createClientsReducer,
    createLoanReducer,
    getOrganisationsReducer,
    getCustomersReducer,
    creditAssessmentReducer,
    createCustomersReducer,
    loanTypesReducer,
    productReducer,
    nextofkinReducer,
    loanStructureReducer,
    getLoansReducer,
    addProductReducer,
    getRepaymentsReducer,
    makeRepaymentsReducer,
    customerLoanReducer,
    bulkLoansUploadsReducer,
    bulkRepaymentsUploadReducer,
    getAgentsReducer,
    createAgentReducer,
    getReportsReducer,
    getMinistriesReducer,
    createFieldAgentReducer,
    getFieldAgentsReducer,
    updateFieldAgentReducer,
    suspendFieldAgentReducer,
    activateFieldAgentReducer,
    fieldAgentLoansReducer,
    loanDetailsReducer,
    preAssessmentReducer,
    clientBusinessRulesReducer,
    updateBusinessRulesReducer
});