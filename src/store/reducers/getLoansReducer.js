import {CLEAR_GET_LOANS_ERROR, CLEAR_GET_LOANS, GET_lOANS_LOADING, GET_LOANS_ERROR, GET_LOAN} from '../actions/types';

const initialValues = {
    loans: null,
    loans_loading: false,
    loans_error: null
}

export default function (state = initialValues, action){
    switch (action.type) {
        case CLEAR_GET_LOANS_ERROR:
            return {
                ...state,
                loans_loading: false,
                loans_error: null
            }
        case CLEAR_GET_LOANS:
            return {
                ...state,
                loans: null,
                loans_loading: false,
                loans_error: null
            }
        case GET_lOANS_LOADING:
            return {
                ...state,
                loans_loading: true,
                loans_error: null
            }
        case GET_LOANS_ERROR:
            return {
                ...state,
                loans: null,
                loans_loading: false,
                loans_error: action.payload
            }
        case GET_LOAN:
            return {
                ...state,
                loans: action.payload,
                loans_loading: false,
                loans_error: null
            }
        default:
            return state
    }
}