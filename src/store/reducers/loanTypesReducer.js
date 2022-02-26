import { CLEAR_GET_LOAN_TYPES_ERROR, CLEAR_GET_LOAN_TYPES, GET_LOAN_TYPES_LOADING, GET_LOAN_TYPES_ERROR, GET_LOAN_TYPES } from '../actions/types';

const initialState = {
    loan_types: null,
    loan_types_loading: false,
    loan_types_error: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case CLEAR_GET_LOAN_TYPES_ERROR:
            return {
                ...state,
                loan_types_loading: false,
                loan_types_error: null
            }
        case CLEAR_GET_LOAN_TYPES:
            return {
                ...state,
                loan_types: null,
                loan_types_loading: false,
                loan_types_error: null
            }
        case GET_LOAN_TYPES_LOADING:
            return {
                ...state,
                loan_types_loading: true,
                loan_types_error: null
            }
        case GET_LOAN_TYPES_ERROR:
            return {
                ...state,
                loan_types_loading: false,
                loan_types_error: action.payload
            }
        case GET_LOAN_TYPES:
            return {
                ...state,
                loan_types: action.payload,
                loan_types_loading: false,
                loan_types_error: null
            }
        default:
            return state
    }
}