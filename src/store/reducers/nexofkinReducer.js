import { CLEAR_NOK_ERROR, CLEAR_NOK, NOK_LOADING, NOK_ERROR, GET_NOK } from '../actions/types';

const initialState = {
    nok: null,
    nok_error: null,
    nok_loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case CLEAR_NOK_ERROR:
            return {
                ...state,
                nok_error: null,
                nok_loading: false
            }
        case CLEAR_NOK:
            return {
                ...state,
                nok: null,
                nok_error: null,
                nok_loading: false
            }
        case NOK_LOADING:
            return {
                ...state,
                nok_error: null,
                nok_loading: true
            }
        case NOK_ERROR:
            return {
                ...state,
                nok_error: action.payload,
                nok_loading: false
            }
        case GET_NOK:
            return {
                ...state,
                nok: action.payload,
                nok_error: null,
                nok_loading: false
            }
        default:
            return state
    }
}