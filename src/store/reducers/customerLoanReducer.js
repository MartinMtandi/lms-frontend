import {CLEAR_GET_CUSTOMER_LOAN, CLEAR_GET_CUSTOMER_LOAN_ERROR, GET_CUSTOMER_LOAN_LOADING, GET_CUSTOMER_LOANS_ERROR, GET_CUSTOMER_LOANS} from '../actions/types';

const initialState = {
    customer_loan: null,
    customer_loan_loading: false,
    customer_loan_error: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_GET_CUSTOMER_LOAN:
            return {
                ...state,
                customer_loan: null,
                customer_loan_loading: false,
                customer_loan_error: null
            }
        case CLEAR_GET_CUSTOMER_LOAN_ERROR:
            return {
                ...state,
                customer_loan_loading: false,
                customer_loan_error: null
            }
        case GET_CUSTOMER_LOAN_LOADING:
            return {
                ...state,
                customer_loan_loading: true,
                customer_loan_error: null
            }
        case GET_CUSTOMER_LOANS_ERROR:
            return {
                ...state,
                customer_loan_loading: false,
                customer_loan_error: action.payload
            }
        case GET_CUSTOMER_LOANS:
            return {
                ...state,
                customer_loan: action.payload,
                customer_loan_loading: false,
                customer_loan_error: null
            }
        default:
            return state;
    }
}