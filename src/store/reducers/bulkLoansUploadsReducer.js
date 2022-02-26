import {CLEAR_BULK_LOANS_UPLOADS, CLEAR_BULK_LOANS_ERROR, BULK_LOANS_LOADING, BULK_LOAN_ERROR, BULK_LOAN_UPLOADS} from '../actions/types';

const initialValues = {
    bulk_loans: null,
    bulk_loans_error: null,
    bulk_loans_loading: false
}

export default function (state = initialValues, actions) {
    switch (actions.type) {
        case CLEAR_BULK_LOANS_UPLOADS:
            return {
                ...state,
                bulk_loans: null,
                bulk_loans_error: null,
                bulk_loans_loading: false
            }
        case CLEAR_BULK_LOANS_ERROR:
            return {
                ...state,
                bulk_loans_error: null,
                bulk_loans_loading: false
            }
        case BULK_LOANS_LOADING:
            return {
                ...state,
                bulk_loans_error: null,
                bulk_loans_loading: true
            }
        case BULK_LOAN_ERROR:
            return {
                ...state,
                bulk_loans_error: actions.payload,
                bulk_loans_loading: false
            }
        case BULK_LOAN_UPLOADS: 
            return {
                ...state,
                bulk_loans: actions.payload,
                bulk_loans_error: null,
                bulk_loans_loading: false
            }
        default:
            return state;
    }
}