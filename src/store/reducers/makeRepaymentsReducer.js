import {CLEAR_MAKE_REPAYMENTS, CLEAR_MAKE_REPAYMENTS_ERROR, MAKE_LOAN_REPAYMENT_LOADING, MAKE_LOAN_REPAYMENTS_ERROR, MAKE_LOAN_REPAYMENTS} from '../actions/types';

const initialState = {
    repayment: null,
    repayment_loading: false,
    repayment_error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_MAKE_REPAYMENTS:
            return {
                ...state,
                repayment: null,
                repayment_loading: false,
                repayment_error: null
            }
        case CLEAR_MAKE_REPAYMENTS_ERROR:
            return {
                ...state,
                repayment_loading: false,
                repayment_error: null
            }
        case MAKE_LOAN_REPAYMENT_LOADING:
            return {
                ...state,
                repayment_loading: true,
                repayment_error: null
            }
        case MAKE_LOAN_REPAYMENTS_ERROR:
            return {
                ...state,
                repayment_loading: false,
                repayment_error: action.payload
            }
        case MAKE_LOAN_REPAYMENTS:
            return {
                ...state,
                repayment: action.payload,
                repayment_loading: false,
                repayment_error: null
            }
        default:
            return state;
    }
}