import {CLEAR_LOAN_DETAILS, CLEAR_LOAN_DETAILS_ERROR, LOAN_DETAILS_LOADING, LOAN_DETAILS_ERROR, LOAN_DETAILS} from '../actions/types';

const initialState = {
    loan_details: null,
    loan_details_error: null,
    loan_details_loading: false
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_LOAN_DETAILS:
            return {
                ...state,
                loan_details: null,
                loan_details_error: null,
                loan_details_loading: false
            }
        case CLEAR_LOAN_DETAILS_ERROR:
            return {
                ...state,
                loan_details_error: null,
                loan_details_loading: false
            }
        case LOAN_DETAILS_LOADING:
            return {
                ...state,
                loan_details_error: null,
                loan_details_loading: true
            }
        case LOAN_DETAILS_ERROR:
            return {
                ...state,
                loan_details_error: action.payload,
                loan_details_loading: false
            }
        case LOAN_DETAILS:
            return {
                ...state,
                loan_details: action.payload,
                loan_details_error: null,
                loan_details_loading: false
            }
        default: return state
    }
}