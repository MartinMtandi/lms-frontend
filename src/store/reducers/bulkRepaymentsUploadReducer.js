import {CLEAR_BULK_REPAYMENTS_UPLOADS, CLEAR_BULK_REPAYMENTS_ERROR, BULK_REPAYMENTS_LOADING, BULK_REPAYMENTS_ERROR, BULK_REPAYMENTS_UPLOADS} from '../actions/types';

const initialValues = {
    bulk_repayments: null,
    bulk_repayments_error: null,
    bulk_repayments_loading: false
}

export default function (state = initialValues, action) {
    switch (action.type) {
        case CLEAR_BULK_REPAYMENTS_UPLOADS:
            return {
                ...state,
                bulk_repayments: null,
                bulk_repayments_error: null,
                bulk_repayments_loading: false
            }
        case CLEAR_BULK_REPAYMENTS_ERROR:
            return {
                ...state,
                bulk_repayments_error: null,
                bulk_repayments_loading: false
            }
        case BULK_REPAYMENTS_LOADING:
            return {
                ...state,
                bulk_repayments_error: null,
                bulk_repayments_loading: true
            }
        case BULK_REPAYMENTS_ERROR:
            return {
                ...state,
                bulk_repayments_error: action.payload,
                bulk_repayments_loading: false
            }
        case BULK_REPAYMENTS_UPLOADS:
            return {
                ...state,
                bulk_repayments: action.payload,
                bulk_repayments_error: null,
                bulk_repayments_loading: false
            }
        default:
            return state;
    }
}