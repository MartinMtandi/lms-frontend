import Axios from "axios";
import Cookies from "js-cookie";

import {
    AUTH_LOADING, 
    AUTH, 
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    CLEAR_AUTH,

    SET_FETCH_LOANS_LOADING,
    CLEAR_FETCH_LOANS,
    CLEAR_FETCH_LOANS_ERROR,
    FETCH_ALL_LOANS_ERROR,
    FETCH_ALL_LOANS,

    CLEAR_STATISTICS_ERROR,
    CLEAR_STATISTICS,
    SET_STATISTICS_LOADING,
    FETCH_STATISTICS_ERROR,
    FETCH_STATISTICS,

    CLEAR_LOAN_STATS,
    SET_LOAN_STATS_LOADING,
    CLEAR_LOAN_STATS_ERROR,
    FETCH_LOAN_STATISTICS_ERROR,
    FETCH_LOAN_STATISTICS,

    CUSTOMER_STATISTICS,
    CUSTOMER_STATISTICS_ERROR,
    SET_CUSTOMER_STATS_LOADING,
    CLEAR_CUSTOMER_STATS,
    CLEAR_CUSTOMER_STATS_ERROR,

    CLEAR_GET_CUSTOMERS,
    CLEAR_GET_CUSTOMERS_ERROR,
    GET_CUSTOMERS_LOADING,
    GET_CUSTOMERS_ERROR,
    GET_CUSTOMERS,

    CLEAR_GET_CLIENTS, 
    CLEAR_GET_CLIENTS_ERROR, 
    GET_CLIENTS_LOADING, 
    GET_CLIENTS_ERROR, 
    GET_CLIENTS,

    CLEAR_CREATE_CUSTOMER_ERROR,
    CLEAR_CREATE_CUSTOMER,
    CREATE_CUSTOMER_LOADING,
    CREATE_CUSTOMER_ERROR,
    CREATE_CUSTOMER,

    CLEAR_CREATE_LOAN_ERROR,
    CLEAR_CREATE_LOAN,
    CREATE_LOAN_LOADING,
    CREATE_LOAN_ERROR,
    CREATE_LOAN,

    CLEAR_CREATE_CLIENT_ERROR,
    CLEAR_CREATE_CLIENT,
    CREATE_CLIENT_ERROR,
    CREATE_CLIENT,
    CREATE_CLIENT_LOADING,

    CLEAR_ORGANISATION_ERROR,
    CLEAR_ORGANISATIONS,
    GET_ORGANISATION_LOADING,
    GET_ORGANISATIONS_ERROR,
    GET_ORGANISATIONS,

    CLEAR_CREDIT_ASSESSMENT_ERROR,
    CLEAR_CREDIT_ASSESSMENT,
    CREDT_ASSESSMENT_LOADING,
    CREDIT_ASSESSMENT_ERROR,
    CREDIT_ASSESSMENT,

    CLEAR_GET_LOAN_TYPES_ERROR,
    CLEAR_GET_LOAN_TYPES,
    GET_LOAN_TYPES_LOADING,
    GET_LOAN_TYPES_ERROR,
    GET_LOAN_TYPES,

    CLEAR_GET_PRODUCTS_ERROR,
    CLEAR_GET_PRODUCTS,
    GET_PRODUCTS_LOADING,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS,

    CLEAR_NOK_ERROR,
    CLEAR_NOK,
    NOK_LOADING,
    NOK_ERROR,
    GET_NOK,

    CLEAR_LOAN_STRUCTURE_ERROR,
    CLEAR_LOAN_STRUCTURE,
    LOAN_STRUCTURE_LOADING,
    LOAN_STRUCTURE_ERROR,
    LOAN_STRUCTURE,

    CLEAR_GET_LOANS_ERROR,
    CLEAR_GET_LOANS,
    GET_lOANS_LOADING,
    GET_LOANS_ERROR,
    GET_LOAN,

    CLEAR_ADD_PRODUCT_ERROR,
    ADD_PRODUCT_LOADING,
    CLEAR_ADD_PRODUCT,
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT,

    CLEAR_LOAN_REPAYMENTS,
    CLEAR_LOAN_REPAYMENTS_ERROR,
    GET_LOAN_REPAYMENT_LOADING,
    GET_LOAN_REPAYMENTS_ERROR,
    GET_LOAN_REPAYMENTS,

    CLEAR_MAKE_REPAYMENTS,
    CLEAR_MAKE_REPAYMENTS_ERROR,
    MAKE_LOAN_REPAYMENT_LOADING,
    MAKE_LOAN_REPAYMENTS_ERROR,
    MAKE_LOAN_REPAYMENTS,

    CLEAR_GET_CUSTOMER_LOAN,
    CLEAR_GET_CUSTOMER_LOAN_ERROR,
    GET_CUSTOMER_LOAN_LOADING,
    GET_CUSTOMER_LOANS_ERROR,
    GET_CUSTOMER_LOANS,

    CLEAR_BULK_LOANS_UPLOADS,
    CLEAR_BULK_LOANS_ERROR,
    BULK_LOANS_LOADING,
    BULK_LOAN_ERROR,
    BULK_LOAN_UPLOADS,

    CLEAR_BULK_REPAYMENTS_UPLOADS,
    CLEAR_BULK_REPAYMENTS_ERROR,
    BULK_REPAYMENTS_LOADING,
    BULK_REPAYMENTS_ERROR,
    BULK_REPAYMENTS_UPLOADS,

    CLEAR_GET_AGENTS_ERROR,
    CLEAR_GET_AGENTS,
    GET_AGENTS_LOADING,
    GET_AGENTS_ERROR,
    GET_AGENTS,

    CLEAR_CREATE_AGENTS_ERROR,
    CLEAR_CREATE_AGENTS,
    CREATE_AGENTS_LOADING,
    CREATE_AGENTS_ERROR,
    CREATE_AGENTS,

    CLEAR_REPORTS,
    CLEAR_REPORTS_ERROR,
    GET_REPORTS_LOADING,
    GET_REPORTS_ERROR,
    GET_REPORTS,

    CLEAR_GET_MINISTRIES_ERROR,
    CLEAR_GET_MINISTRIES,
    GET_MINISTRIES_LOADING,
    GET_MINISTRIES_ERROR,
    GET_MINISTRIES,

    CLEAR_CREATE_FIELD_AGENT,
    CLEAR_CREATE_FIELD_AGENT_ERROR,
    CREATE_FIELD_AGENT_LOADING,
    CREATE_FIELD_AGENT_ERROR,
    CREATE_FIELD_AGENT,

    CLEAR_GET_FIELD_AGENTS_ERROR,
    CLEAR_GET_FIELD_AGENTS,
    GET_FIELD_AGENTS_LOADING,
    GET_FIELD_AGENTS_ERROR,
    GET_FIELD_AGENTS,

    CLEAR_UPDATE_FIELD_AGENT_ERROR,
    CLEAR_UPDATE_FIELD_AGENT,
    UPDATE_FIELD_AGENTS_LOADING,
    UPDATE_FIELD_AGENTS_ERROR,
    UPDATE_FIELD_AGENTS,

    CLEAR_ACTIVATE_FIELD_AGENT,
    CLEAR_ACTIVATE_FIELD_AGENT_ERROR,
    ACTIVATE_FIELD_AGENT_LOADING,
    ACTIVATE_FIELD_AGENT_ERROR,
    ACTIVATE_FIELD_AGENT,

    CLEAR_SUSPEND_FIELD_AGENT,
    CLEAR_SUSPEND_FIELD_AGENT_ERROR,
    SUSPEND_FIELD_AGENT_LOADING,
    SUSPEND_FIELD_AGENT_ERROR,
    SUSPEND_FIELD_AGENT,

    CLEAR_FIELD_AGENTS_LOANS_ERROR,
    CLEAR_FIELD_AGENTS_LOANS,
    FIELD_AGENTS_LOANS_LOADING,
    FIELD_AGENTS_LOANS_ERROR,
    FIELD_AGENTS_LOANS,

    CLEAR_LOAN_DETAILS,
    CLEAR_LOAN_DETAILS_ERROR,
    LOAN_DETAILS_LOADING,
    LOAN_DETAILS_ERROR,
    LOAN_DETAILS,

    CLEAR_PRE_ASSESSMENT_ERROR,
    CLEAR_PRE_ASSESSMENT,
    PRE_ASSESSMENT_LOADING,
    PRE_ASSESSMENT_ERROR,
    PRE_ASSESSMENT,

    CLEAR_CLIENT_BUSINESS_RULES_ERROR,
    CLEAR_CLIENT_BUSINESS_RULES,
    SET_CLIENT_BUSINESS_RULES_LOADING,
    GET_CLIENT_BUSINESS_RULES_ERROR,
    GET_CLIENT_BUSINESS_RULES,

    CLEAR_UPDATE_BUSINESS_RULES,
    CLEAR_UPDATE_BUSINESS_RULES_ERROR,
    UPDATE_BUSINESS_RULES_LOADING,
    UPDATE_BUSINESS_RULES_ERROR,
    UPDATE_BUSINESS_RULES
} from './types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const logout = () => {
    return (dispatch) => {
        Cookies.remove("access");
        dispatch(clearAuth());
        dispatch(clearOrganisations());
        dispatch(clearFetchLoans());
        dispatch(clearStatistics());
        dispatch(clearLoanStats());
        dispatch(clearCustomerStats());
        dispatch(clearGetClients());
        dispatch(clearCreateClient());
        dispatch(clearCustomer());
        dispatch(clearCustomers());
        dispatch(clearCreditAssessment());
        dispatch(clearGetLoanTypes());
        dispatch(clearGetProducts());
        dispatch(clearNextOfKin());
        dispatch(clearLoanStructure());
        dispatch(clearGetLoans());
        dispatch(clearAddProduct());
        dispatch(clearLoanRepayments());
        dispatch(clearMakeRepayments());
        dispatch(clearGetCustomerLoan());
        dispatch(clearBulkLoansUploads());
        dispatch(clearBulkRepaymentsUploads());
        dispatch(clearGetAgents());
        dispatch(clearCreateAgents());
        dispatch(clearReports());
        dispatch(clearGetMinistries());
        dispatch(clearCreateFieldAgent());
        dispatch(clearGetFieldAgents());
        dispatch(clearUpdateFieldAgent());
        dispatch(clearActivateFieldAgent());
        dispatch(clearSuspendFieldAgent());
        dispatch(clearFieldAgentsLoans());
        dispatch(clearLoanDetails());
        dispatch(clearPreAssessment());
        dispatch(clearClientBusinessRules());
        dispatch(clearUpdateBusinessRules());
    }
}

export const login = (data) => (dispatch) => {
    dispatch(setAuthLoading());

    Axios.post(`${BASE_URL}/login`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => {
        const { token } = res.data;
        Cookies.set("access", token);
        dispatch({
            type: AUTH,
            payload: res.data,
        });
    }).catch(err => {
        let error = err.response.data.error
        dispatch({
            type: AUTH_ERROR,
            payload: error,
        });
    })
}

export const setAuthLoading = () => {
	return {
		type: AUTH_LOADING,
	};
};

export const clearAuth = () => {
    return {
        type: CLEAR_AUTH
    }
}

export const clearAuthError = () => {
    return {
        type: CLEAR_AUTH_ERROR
    }
}

export const getAllLoans = (data) => dispatch => {
    dispatch(setfetchLoansLoading());

    const runGetLoans = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/loans?page=${data.page}&rows_per_page=${data.rows_per_page}&from_date=${data.from_date}&to_date=${data.to_date}&loan_ref=${data.loan_ref}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: FETCH_ALL_LOANS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: FETCH_ALL_LOANS_ERROR,
                payload: error,
            });
        })
    }

    runGetLoans();
}


export const setfetchLoansLoading = () => {
    return {
        type: SET_FETCH_LOANS_LOADING
    }
}

export const clearFetchLoans = () => {
    return {
        type: CLEAR_FETCH_LOANS
    }
}

export const clearFetchLoansError = () => {
    return {
        type: CLEAR_FETCH_LOANS_ERROR
    }
}

export const statistics = () => dispatch => {
    dispatch(setStatisticsLoading());

    const runStats = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/stats`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: FETCH_STATISTICS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: FETCH_STATISTICS_ERROR,
                payload: error,
            });
        })
    }

    runStats();
}

export const setStatisticsLoading = () => {
    return {
        type: SET_STATISTICS_LOADING
    }
}

export const clearStatistics = () => {
    return {
        type: CLEAR_STATISTICS
    }
}

export const clearStatisticsError = () => {
    return {
        type: CLEAR_STATISTICS_ERROR
    }
}

export const loanStats = () => dispatch => {
    dispatch(setLoanStatsLoading());

    const runLoanStats = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/loanstats`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: FETCH_LOAN_STATISTICS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: FETCH_LOAN_STATISTICS_ERROR,
                payload: error,
            });
        })
    }

    runLoanStats();
}

export const clearLoanStatsError = () => {
    return {
        type: CLEAR_LOAN_STATS_ERROR
    }
}

export const setLoanStatsLoading = () => {
    return {
        type: SET_LOAN_STATS_LOADING
    }
}

export const clearLoanStats = () => {
    return {
        type: CLEAR_LOAN_STATS
    }
}

export const customerStats = () => dispatch => {
    dispatch(setCustomerStatsLoading());

    const runCustomerStats = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/customerstats`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: CUSTOMER_STATISTICS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: CUSTOMER_STATISTICS_ERROR,
                payload: error,
            });
        })
    }

    runCustomerStats();
}

export const setCustomerStatsLoading = () => {
    return {
        type: SET_CUSTOMER_STATS_LOADING
    }
}

export const clearCustomerStats = () => {
    return {
        type: CLEAR_CUSTOMER_STATS
    }
}

export const clearCustomerStatsError = () => {
    return {
        type: CLEAR_CUSTOMER_STATS_ERROR
    }
}

export const getClients = (data) => dispatch => {
    dispatch(getClientsLoading());

    const runGetClients = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/clients?from_date=${data.from_date}&to_date=${data.to_date}&rows_per_page=${data.rows_per_page}&page=${data.page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: GET_CLIENTS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_CLIENTS_ERROR,
                payload: error,
            });
        })
    }

    runGetClients();
}

export const getClientsLoading = () => {
    return {
        type: GET_CLIENTS_LOADING
    }
}

export const clearGetClientsError = () => {
    return {
        type: CLEAR_GET_CLIENTS_ERROR
    }
}

export const clearGetClients = () => {
    return {
        type: CLEAR_GET_CLIENTS
    }
}

export const createClient = (data) => dispatch => {
    dispatch(createClientLoading());

    const runCreateClient= async () => {
        let token = await Cookies.get("access");
        Axios.post(`${BASE_URL}/createclient`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: CREATE_CLIENT,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: CREATE_CLIENT_ERROR,
                payload: error,
            });
        })
    }

    runCreateClient();
}

export const createClientLoading = () => {
    return {
        type: CREATE_CLIENT_LOADING
    }
}

export const clearCreateClient = () => {
    return {
        type: CLEAR_CREATE_CLIENT
    }
}

export const clearCreateClientError = () => {
    return {
        type: CLEAR_CREATE_CLIENT_ERROR
    }
}

export const createCustomer = (data) => dispatch => {
    dispatch(createCustomerLoading());

    const runCreateLoan = async () => {
        let token = await Cookies.get("access");

        var formData = new FormData();

        formData.append('firstname', data.firstname);
        formData.append('title', data.title);
        formData.append('marital_status', data.marital_status);
        formData.append('education_level', data.educational_level);
        formData.append('residential', data.residential_area);
        formData.append('property_ownership', data.property_ownership);
        formData.append('other_assets_owned', data.other_assets_owned);
        formData.append('ecocash_number', data.ecocash_number);
        formData.append('ministry', data.ministry);
        formData.append('lastname', data.lastname);
        formData.append('mname', data.mname);
        formData.append('address', data.address);
        formData.append('email', data.email);
        formData.append('gender', data.gender);
        formData.append('mobile', data.mobile);
        formData.append('dob', data.dob);
        formData.append('national_id', data.national_id);
        formData.append('suburb', data.suburb);
        formData.append('city', data.city);
        formData.append('next_of_kin_firstname', data.next_of_kin_firstname);
        formData.append('next_of_kin_lastname', data.next_of_kin_lastname);
        formData.append('next_of_kin_address', data.next_of_kin_address);
        formData.append('next_of_kin_mobile', data.next_of_kin_mobile);
        formData.append('next_of_kin_email', data.next_of_kin_email);
        formData.append('next_of_kin_relationship', data.next_of_kin_relationship);
        formData.append('next_of_kin_id', data.next_of_kin_national_id);
        formData.append('next_of_kin_title', data.next_of_kin_title);
        formData.append('employment_type', data.employment_type);
        formData.append('sector', data.sector);
        formData.append('employee_number', data.employee_number);
        formData.append('employment_length', data.employment_length);
        formData.append('password', data.password);
        formData.append('confirm_password', data.confirm_password);
        formData.append('idcard', data.idcard);
        formData.append('addressproof', data.addressproof);
        formData.append('payslip', data.payslip);
        formData.append('statement', data.statement);
        formData.append('bank', data.bank);
        formData.append('account', data.account);
        formData.append('branch_name', data.branch_name);
        formData.append('structure', data.structure);
        formData.append('tenure', data.tenure);
        formData.append('net_salary', data.net_salary);
        formData.append('gross_salary', data.gross_salary);
        formData.append('occupation', data.occupation);
        formData.append('loan_purpose', data.purpose);
        formData.append('branch_code', data.branch_code);
        formData.append('user_id', data.user_id);
        formData.append('loan_type', data.loan_type);
        formData.append('client_id', data.client_id);
        formData.append('available', data.available);
        formData.append('application_type', data.application_type);
        formData.append('available', data.available);
        formData.append('amount', data.amount);
        formData.append('signature', data.signature);
        
        Axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: CREATE_CUSTOMER,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.messages;
            dispatch({
                type: CREATE_CUSTOMER_ERROR,
                payload: error,
            });
        })
    }

    runCreateLoan();
}

export const createCustomerLoading = () => {
    return {
        type: CREATE_CUSTOMER_LOADING
    }
}

export const clearCustomer = () => {
    return {
        type: CLEAR_CREATE_CUSTOMER
    }
}

export const clearApplicantError = () => {
    return {
        type: CLEAR_CREATE_CUSTOMER_ERROR
    }
}

export const getCustomers = (data) => dispatch => {
   dispatch(getCustomersLoading());
   const runGetCustomers = async () => {
        let token  = await Cookies.get("access");

        Axios.get(`${BASE_URL}/customer?from_date=${data.from_date}&to_date=${data.to_date}&rows_per_page=${data.rows_per_page}&page=${data.page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_CUSTOMERS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_CUSTOMERS_ERROR,
                payload: error
            })
        })
   }

   runGetCustomers();
}

export const getCustomersLoading = () => {
    return{
        type: GET_CUSTOMERS_LOADING,
    }
}

export const clearCustomersError = () => {
    return {
        type: CLEAR_GET_CUSTOMERS_ERROR
    }
}

export const clearCustomers = () => {
    return {
        type: CLEAR_GET_CUSTOMERS
    }
}

export const getOrganisations = () => dispatch => {
    dispatch(getOrganisationLoading());

    const runGetOrg = async () => {
        let token  = await Cookies.get("access");
        Axios.get(`${BASE_URL}/organizations`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_ORGANISATIONS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_ORGANISATIONS_ERROR,
                payload: error
            })
        })
    }

    runGetOrg();
}

export const getOrganisationLoading = () => {
    return {
        type: GET_ORGANISATION_LOADING
    }
}

export const clearOrganisations = () => {
    return {
        type: CLEAR_ORGANISATIONS
    }
}

export const clearOrganisationError = () => {
    return {
        type: CLEAR_ORGANISATION_ERROR
    }
}

export const creditAssessment = (data) => dispatch => {
    dispatch(creditAssessmentLoading());

    const runCA = async () => {
        let token = await Cookies.get("access");
        Axios.post(`${BASE_URL}/assessment`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: CREDIT_ASSESSMENT,
                payload: res.data.result
            });
        }).catch(err => {
            let error = (err.response.data.length > 0) ? err.response.data.messages.errors : {error: err.response.statusText};
            dispatch({
                type: CREDIT_ASSESSMENT_ERROR,
                payload: error
            })
        })
    }

    runCA();
}

export const creditAssessmentLoading = () => {
    return {
        type: CREDT_ASSESSMENT_LOADING
    }
}

export const clearCreditAssessment = () => {
    return {
        type: CLEAR_CREDIT_ASSESSMENT
    }
}

export const clearCreditAssessmentError = () => {
    return {
        type: CLEAR_CREDIT_ASSESSMENT_ERROR
    }
}

export const createLoan = (data) => dispatch => {
    dispatch(createLoanLoading());

    const loan = async () => {
        let token = await Cookies.get("access");
        Axios.post(`${BASE_URL}/createloan`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: CREATE_LOAN,
                payload: res.data
            });
        }).catch(err => {
            let error = (err.response.data.length > 0) ? err.response.data.messages.errors : {error: err.response.statusText};
            dispatch({
                type: CREATE_LOAN_ERROR,
                payload: error
            })
        })
    }

    loan();
}

export const createLoanLoading = () => {
    return {
        type: CREATE_LOAN_LOADING
    }
}

export const clearCreateLoan = () => {
    return {
        type: CLEAR_CREATE_LOAN
    }
}

export const clearCreateLoanError = () => {
    return {
        type: CLEAR_CREATE_LOAN_ERROR
    }
}

export const getLoanTypes = () => dispatch => {
    dispatch(getLoanTypeLoading());

    const runLoanType = async () => {
        let token  = await Cookies.get("access");

        Axios.get(`${BASE_URL}/loantypes`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_LOAN_TYPES,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_LOAN_TYPES_ERROR,
                payload: error
            })
        })
    }

    runLoanType();
}

export const getLoanTypeLoading = () => {
    return {
        type: GET_LOAN_TYPES_LOADING
    }
}

export const clearGetLoanTypes = () => {
    return {
        type: CLEAR_GET_LOAN_TYPES
    }
}

export const clearGetLoanTypesError = () => {
    return {
        type: CLEAR_GET_LOAN_TYPES_ERROR
    }
}

export const getProducts = (data) => dispatch => {
    dispatch(setGetProductsLoading());
    const prod = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/products?from_date=${data.from_date}&to_date=${data.to_date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_PRODUCTS_ERROR,
                payload: error
            })
        })
    }

    prod();
}

export const setGetProductsLoading = () => {
    return {
        type: GET_PRODUCTS_LOADING
    }
}

export const clearGetProducts = () => {
    return {
        type: CLEAR_GET_PRODUCTS
    }
}

export const clearGetProductsError = () => {
    return {
        type: CLEAR_GET_PRODUCTS_ERROR
    }
}

export const nextOfKin = (id) => dispatch => {
    dispatch(nextOfKinLoading());

    const nok = async () => {
        let token = await Cookies.get("access");
        
        Axios.get(`${BASE_URL}/nextofkin/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            } 
        }).then(res => {
            dispatch({
                type: GET_NOK,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: NOK_ERROR,
                payload: error
            })
        })
    }

    nok();
}

export const nextOfKinLoading = () => {
    return {
        type: NOK_LOADING
    }
}

export const clearNextOfKin = () => {
    return {
        type: CLEAR_NOK
    }
}

export const clearNextOfKinError = () => {
    return {
        type: CLEAR_NOK_ERROR
    }
}

export const loanStructure = () => dispatch => {
    dispatch(loanStructureLoading());

    const runLoan = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/loanstructures?rows_per_page=20&page=1`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            } 
        }).then(res => {
            dispatch({
                type: LOAN_STRUCTURE,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: LOAN_STRUCTURE_ERROR,
                payload: error
            })
        })
    }

    runLoan();
}

export const loanStructureLoading = () => {
    return {
        type: LOAN_STRUCTURE_LOADING
    }
}

export const clearLoanStructure = () => {
    return {
        type: CLEAR_LOAN_STRUCTURE
    }
}

export const clearLoanStructureError = () => {
    return {
        type: CLEAR_LOAN_STRUCTURE_ERROR
    }
}

export const getLoans = (data) => dispatch => {
    dispatch(getLoansLoading());

    const runLoans = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/loans?from_date=${data.from_date}&to_date=${data.to_date}${(data.customer) ? `&customer=${data.customer}` : ""}&page=${data.page}&rows_per_page=${data.rows_per_page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            } 
        }).then(res => {
            dispatch({
                type: GET_LOAN,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_LOANS_ERROR,
                payload: error
            })
        })
    }

    runLoans();
}

export const getLoansLoading = () => {
    return {
        type: GET_lOANS_LOADING
    }
}

export const clearGetLoans = () => {
    return {
        type: CLEAR_GET_LOANS
    }
}

export const clearGetLoansError = () => {
    return {
        type: CLEAR_GET_LOANS_ERROR
    }
}

export const addProduct = (data) => dispatch => {
    dispatch(addProductLoading());

    const runProd = async () => {
        let token = await Cookies.get("access");

        var formData = new FormData();

        formData.append('product_name', data.product_name);
        formData.append('agent_id', data.agent_id);
        formData.append('sku', data.sku);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('userfile', data.userfile);

        Axios.post(`${BASE_URL}/createproduct`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            console.log(res.data)
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.messages.errors;

            dispatch({
                type: ADD_PRODUCT_ERROR,
                payload: error
            })
        })
    }

    runProd();
}

export const clearAddProduct = () => {
    return {
        type: CLEAR_ADD_PRODUCT
    }
}

export const addProductLoading = () => {
    return {
        type: ADD_PRODUCT_LOADING
    }
}

export const clearAddProductError = () => {
    return {
        type: CLEAR_ADD_PRODUCT_ERROR
    }
}

export const getLoanRepayments = (data) => dispatch => {
    dispatch(getLoanRepaymentsLoading());

    const runRepayments = async () => {
        let token  = await Cookies.get("access");

        Axios.get(`${BASE_URL}/repayments/${data.repaymentId}?page=${data.page}&rows_per_page=${data.rows_per_page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_LOAN_REPAYMENTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_LOAN_REPAYMENTS_ERROR,
                payload: error
            })
        })
    }

    runRepayments();
}

export const getLoanRepaymentsLoading = () => {
    return {
        type: GET_LOAN_REPAYMENT_LOADING
    }
}

export const clearLoanRepaymentsError = () => {
    return {
        type: CLEAR_LOAN_REPAYMENTS_ERROR
    }
}

export const clearLoanRepayments = () => {
    return {
        type: CLEAR_LOAN_REPAYMENTS
    }
}

export const makeLoanRepayments = (data) => dispatch => {
    dispatch(makeLoanRepaymentsLoading());

    const makeRepayments = async () => {
        let token  = await Cookies.get("access");

        Axios.post(`${BASE_URL}/makerepayment/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: MAKE_LOAN_REPAYMENTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.messages.error;
            dispatch({
                type: MAKE_LOAN_REPAYMENTS_ERROR,
                payload: error
            })
        })
    }

    makeRepayments();
}

export const makeLoanRepaymentsLoading = () => {
    return {
        type: MAKE_LOAN_REPAYMENT_LOADING
    }
}

export const clearMakeRepaymentsError = () => {
    return {
        type: CLEAR_MAKE_REPAYMENTS_ERROR
    }
}

export const clearMakeRepayments = () => {
    return {
        type: CLEAR_MAKE_REPAYMENTS
    }
}

export const getCustomerLoans = (data) => dispatch => {
    dispatch(getCustomerLoanLoading());

    const loans = async () => {
        let token = await Cookies.get("access");
        Axios.get(`${BASE_URL}/customerloans/${data.id}?page=${data.page}&rows_per_page=${data.rows_per_page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_CUSTOMER_LOANS,
                payload: res.data,
            });
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_CUSTOMER_LOANS_ERROR,
                payload: error,
            });
        })
    }

    loans();
}

export const getCustomerLoanLoading = () => {
    return {
        type: GET_CUSTOMER_LOAN_LOADING
    }
}

export const clearGetCustomerLoanError = () => {
    return {
        type: CLEAR_GET_CUSTOMER_LOAN_ERROR
    }
}

export const clearGetCustomerLoan = () => {
    return {
        type: CLEAR_GET_CUSTOMER_LOAN
    }
}

export const uploadBulkLoans = (data) => dispatch => {
    dispatch(bulkLoansLoading());

    const runLoanUploads = async () => {
        let token = await Cookies.get("access");

        var formData = new FormData();

        formData.append('file', data.file);

        Axios.post(`${BASE_URL}/uploadloans`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: BULK_LOAN_UPLOADS,
                payload: res.data
            });
        }).catch(err => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: BULK_LOAN_ERROR,
                payload: error,
            });
        })
    }

    runLoanUploads();
}

export const bulkLoansLoading = () => {
    return {
        type: BULK_LOANS_LOADING
    }
}

export const clearBulkLoansError = () => {
    return {
        type: CLEAR_BULK_LOANS_ERROR
    }
}

export const clearBulkLoansUploads = () => {
    return {
        type: CLEAR_BULK_LOANS_UPLOADS
    }
}

export const uploadBulkRepayments = (data) => dispatch => {
    dispatch(bulkRepaymentsLoading());

    const runRepaymentsUploads = async () => {
        let token = await Cookies.get("access");

        var formData = new FormData();

        formData.append('file', data.file);

        Axios.post(`${BASE_URL}/bulkrepayments`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => {
            dispatch({
                type: BULK_REPAYMENTS_UPLOADS,
                payload: res.data
            });
        }).catch(err => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: BULK_REPAYMENTS_ERROR,
                payload: error,
            });
        })
    }

    runRepaymentsUploads();
}

export const bulkRepaymentsLoading = () => {
    return {
        type: BULK_REPAYMENTS_LOADING
    }
}

export const clearBulkRepaymentsError = () => {
    return {
        type: CLEAR_BULK_REPAYMENTS_ERROR
    }
}

export const clearBulkRepaymentsUploads = () => {
    return {
        type: CLEAR_BULK_REPAYMENTS_UPLOADS
    }
}

export const getAgents = (data) => dispatch => {
    dispatch(getAgentsLoading());

    const runGetAgents = async () => {
        let token  = await Cookies.get("access");

        Axios.get(`${BASE_URL}/agents?from_date=${data.from_date}&to_date=${data.to_date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: GET_AGENTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_AGENTS_ERROR,
                payload: error
            }) 
        })
        
    }

    runGetAgents();
}

export const getAgentsLoading = () => {
    return {
        type: GET_AGENTS_LOADING
    }
}

export const clearGetAgents = () => {
    return {
        type: CLEAR_GET_AGENTS
    }
}

export const clearGetAgentsError = () => {
    return {
        type: CLEAR_GET_AGENTS_ERROR
    }
}

// create an agent


export const createAgent = (data) => dispatch => {
    dispatch(createAgentsLoading());

    const runCreateAgent = async () => {
        let token  = await Cookies.get("access");

        Axios.post(`${BASE_URL}/createagent`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({
                type: CREATE_AGENTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: CREATE_AGENTS_ERROR   ,
                payload: error
            }) 
        })
        
    }

    runCreateAgent();
}

export const createAgentsLoading = () => {
    return {
        type: CREATE_AGENTS_LOADING
    }
}

export const clearCreateAgents = () => {
    return {
        type: CLEAR_CREATE_AGENTS
    }
}

export const clearCreateAgentsError = () => {
    return {
        type: CLEAR_CREATE_AGENTS_ERROR
    }
}

export const getReports = (data) => dispatch => {
    dispatch(getReportsLoading());

    const runReports = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/reports?filter_by=range&start=${data.from_date}&end=${data.to_date}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_REPORTS_ERROR,
                payload: error
            })
        })
    }

    runReports();
} 

export const getReportsLoading = () => {
    return {
        type: GET_REPORTS_LOADING
    }
}

export const clearReportsError = () => {
    return {
        type: CLEAR_REPORTS_ERROR
    }
}

export const clearReports = () => {
    return {
        type: CLEAR_REPORTS
    }
}

export const getMinistries = () => dispatch => {
    dispatch(getMinistriesLoading());

    const runMinistries = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/ministries`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch({
                type: GET_MINISTRIES,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_MINISTRIES_ERROR,
                payload: error
            })
        })
    }

    runMinistries();
}

export const getMinistriesLoading = () => {
    return {
        type: GET_MINISTRIES_LOADING,
    }
}

export const clearGetMinistries = () => {
    return {
        type: CLEAR_GET_MINISTRIES
    }
}

export const clearGetMinistriesError = () => {
    return {
        type: CLEAR_GET_MINISTRIES_ERROR,
    }
}

export const createFieldAgent = (data) => dispatch => {
    dispatch(createFieldAgentLoading());

    const runFieldAgent = async () => {
        let token = await Cookies.get("access");

        Axios.post(`${BASE_URL}/fieldagent`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            dispatch({
                type: CREATE_FIELD_AGENT,
                payload: response.data
            })
        }).catch(err => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: CREATE_FIELD_AGENT_ERROR,
                payload: error
            })
        })

    }

    runFieldAgent();
}

export const createFieldAgentLoading = () => {
    return {
        type: CREATE_FIELD_AGENT_LOADING
    }
}

export const clearCreateFieldAgentError = () => {
    return {
        type: CLEAR_CREATE_FIELD_AGENT_ERROR
    }
}

export const clearCreateFieldAgent = () => {
    return {
        type: CLEAR_CREATE_FIELD_AGENT
    }
}

export const getFieldAgents = (cliend_id) => dispatch => {
    dispatch(getFieldAgentsLoading());

    const runAgents = async () => {
        let token = await Cookies.get("access");
        
        Axios.get(`${BASE_URL}/fieldagents/${cliend_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch({
                type: GET_FIELD_AGENTS,
                payload: res.data 
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_FIELD_AGENTS_ERROR,
                payload: error
            })
        })
    }

    runAgents();
}

export const getFieldAgentsLoading = () => {
    return {
        type: GET_FIELD_AGENTS_LOADING
    }
}

export const clearGetFieldAgents = () => {
    return {
        type: CLEAR_GET_FIELD_AGENTS
    }
}

export const clearGetFieldAgentsError = () => {
    return {
        type: CLEAR_GET_FIELD_AGENTS_ERROR
    }
}

export const updateFieldAgent = (data) => dispatch => {
    dispatch(updateFieldAgentLoading());

    const runUpdateAgent = async () => {
        let token = await Cookies.get("access");

        Axios.post(`${BASE_URL}/updatefieldagent/${data.client_id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch({
                type: UPDATE_FIELD_AGENTS,
                payload: res.data 
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: UPDATE_FIELD_AGENTS_ERROR,
                payload: error
            })
        })
    }

    runUpdateAgent();
}

export const updateFieldAgentLoading = () => {
    return {
        type: UPDATE_FIELD_AGENTS_LOADING,
    }
}

export const clearUpdateFieldAgent = () => {
    return {
        type: CLEAR_UPDATE_FIELD_AGENT
    }
}

export const clearUpdateFieldAgentError = () => {
    return {
        type: CLEAR_UPDATE_FIELD_AGENT_ERROR
    }
}

export const suspendFieldAgent = (agent_id) => dispatch => {
    dispatch(suspendFieldAgentLoading());

    const runUpdateFA = async () => {
        let token = await Cookies.get("access");
        
        Axios.post(`${BASE_URL}/suspend/${agent_id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            dispatch({
                type: SUSPEND_FIELD_AGENT,
                payload: response.data
            })
        }).catch((err) => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: SUSPEND_FIELD_AGENT_ERROR,
                payload: error
            })
        })
    }

    runUpdateFA();
}

export const suspendFieldAgentLoading = () => {
    return {
        type: SUSPEND_FIELD_AGENT_LOADING
    }
}

export const clearSuspendFieldAgentError = () => {
    return {
        type: CLEAR_SUSPEND_FIELD_AGENT_ERROR
    }
}

export const clearSuspendFieldAgent = () => {
    return {
        type: CLEAR_SUSPEND_FIELD_AGENT
    }
}

export const activateFieldAgent = (agent_id) => dispatch => {
    dispatch(activateFieldAgentLoading());

    const runActivateFA = async () => {
        let token = await Cookies.get("access");

        Axios.post(`${BASE_URL}/activate/${agent_id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            dispatch({
                type: ACTIVATE_FIELD_AGENT,
                payload: response.data
            })
        }).catch((err) => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: ACTIVATE_FIELD_AGENT_ERROR,
                payload: error
            })
        })
    }

    runActivateFA();
}

export const activateFieldAgentLoading = () => {
    return {
        type: ACTIVATE_FIELD_AGENT_LOADING
    }
}

export const clearActivateFieldAgentError = () => {
    return {
        type: CLEAR_ACTIVATE_FIELD_AGENT_ERROR
    }
}

export const clearActivateFieldAgent = () => {
    return {
        type: CLEAR_ACTIVATE_FIELD_AGENT
    }
}

export const getFieldAgentLoans = (id) => dispatch => {
    dispatch(runFieldAgentsLoansLoading());

    const fieldAgentLoans = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/agentloans/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(response => {
            dispatch({
                type: FIELD_AGENTS_LOANS,
                payload: response.data 
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: FIELD_AGENTS_LOANS_ERROR,
                payload: error
            })
        })
    }

    fieldAgentLoans();
}

export const runFieldAgentsLoansLoading = () => {
    return {
        type: FIELD_AGENTS_LOANS_LOADING
    }
}

export const clearFieldAgentsLoans = () => {
    return {
        type: CLEAR_FIELD_AGENTS_LOANS
    }
}

export const clearFieldAgentsLoansError = () => {
    return {
        type: CLEAR_FIELD_AGENTS_LOANS_ERROR
    }
}

export const loanDetails = (id) => dispatch => {
    dispatch(loanDetailsLoading());

    const runLoanDetails = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/loandetails/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch({
                type: LOAN_DETAILS,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: LOAN_DETAILS_ERROR,
                payload: error
            })
        })
    }

    runLoanDetails();
}

export const loanDetailsLoading = () => {
    return {
        type: LOAN_DETAILS_LOADING
    }
}

export const clearLoanDetailsError = () => {
    return {
        type: CLEAR_LOAN_DETAILS_ERROR
    }
}

export const clearLoanDetails = () => {
    return {
        type: CLEAR_LOAN_DETAILS
    }
}

export const preAssessment = (data) => dispatch => {
    dispatch(preAssessmentLoading());

    const runPreAsssessment = async () => {
        let token = await Cookies.get("access");

        var formData = new FormData();

        formData.append('gross_salary', data.gross_salary);
        formData.append('net_salary', data.net_salary);
        formData.append('amount', data.amount);
        formData.append('client_id', data.client_id);
        formData.append('tenure', data.tenure);


        Axios.post(`${BASE_URL}/preassessment`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(function (response) {
            dispatch({
                type: PRE_ASSESSMENT,
                payload: response.data
            })
        }).catch(err => {
            let error = err.response.data.messages.message;
            dispatch({
                type: PRE_ASSESSMENT_ERROR,
                payload: error
            })
        })
    }

    runPreAsssessment();
}

export const preAssessmentLoading = () => {
    return {
        type: PRE_ASSESSMENT_LOADING
    }
}

export const clearPreAssessment = () => {
    return {
        type: CLEAR_PRE_ASSESSMENT
    }
}

export const clearPreAssessmentError = () => {
    return {
        type: CLEAR_PRE_ASSESSMENT_ERROR
    }
}

export const getClientBusinessRules = (id) => dispatch => {
    dispatch(setClientBusinessRulesLoading());

    const runBusinessRules = async () => {
        let token = await Cookies.get("access");

        Axios.get(`${BASE_URL}/rules/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => {
            dispatch({
                type: GET_CLIENT_BUSINESS_RULES,
                payload: response.data
            })
        }).catch(err => {
            let error = err.response.data.message;
            dispatch({
                type: GET_CLIENT_BUSINESS_RULES_ERROR,
                payload: error
            })
        })
    }

    runBusinessRules();
}

export const setClientBusinessRulesLoading = () => {
    return {
        type: SET_CLIENT_BUSINESS_RULES_LOADING
    }
}

export const clearClientBusinessRules = () => {
    return {
        type: CLEAR_CLIENT_BUSINESS_RULES
    }
}

export const clearClientBusinessRulesError = () => {
    return {
        type: CLEAR_CLIENT_BUSINESS_RULES_ERROR
    }
}

export const updateBusinessRules = (data) => dispatch => {
    dispatch(updateBusinessRulesLoading());

    const runUpdateRules = async () => {
        let token = await Cookies.get("access");

        Axios.post(`${BASE_URL}/updaterules/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            dispatch({
                type: UPDATE_BUSINESS_RULES,
                payload: res.data
            })
        }).catch(err => {
            let error = err.response.data.messages.errors;
            dispatch({
                type: UPDATE_BUSINESS_RULES_ERROR,
                payload: error
            })
        })
    }

    runUpdateRules();
}

export const updateBusinessRulesLoading = () => {
    return {
        type: UPDATE_BUSINESS_RULES_LOADING
    }
}

export const clearUpdateBusinessRulesError = () => {
    return {
        type: CLEAR_UPDATE_BUSINESS_RULES_ERROR
    }
}

export const clearUpdateBusinessRules = () => {
    return {
        type: CLEAR_UPDATE_BUSINESS_RULES
    }
}



