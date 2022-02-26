import {CLEAR_LOAN_REPAYMENTS, CLEAR_LOAN_REPAYMENTS_ERROR, GET_LOAN_REPAYMENT_LOADING, GET_LOAN_REPAYMENTS_ERROR, GET_LOAN_REPAYMENTS} from '../actions/types';

const initialState = {
    loan_repayments: null,
    loan_repayments_error: null,
    loan_repayments_loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_LOAN_REPAYMENTS:
            return {
                ...state,
                loan_repayments: null,
                loan_repayments_error: null,
                loan_repayments_loading: false
            }
        case CLEAR_LOAN_REPAYMENTS_ERROR:
            return {
                ...state,
                loan_repayments_error: null,
                loan_repayments_loading: false
            }
        case GET_LOAN_REPAYMENT_LOADING:
            return {
                ...state,
                loan_repayments_error: null,
                loan_repayments_loading: true
            }
        case GET_LOAN_REPAYMENTS_ERROR:
            return {
                ...state,
                loan_repayments_error: action.payload,
                loan_repayments_loading: false
            }
        case GET_LOAN_REPAYMENTS:
            return {
                ...state,
                loan_repayments: action.payload,
                loan_repayments_error: null,
                loan_repayments_loading: false
            }
        default:
            return state;
    }
}