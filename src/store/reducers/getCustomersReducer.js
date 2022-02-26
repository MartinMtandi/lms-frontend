/* eslint-disable import/no-anonymous-default-export */
import {CLEAR_GET_CUSTOMERS, CLEAR_GET_CUSTOMERS_ERROR, GET_CUSTOMERS_LOADING, GET_CUSTOMERS_ERROR, GET_CUSTOMERS} from '../actions/types';

const initialState = {
    get_customers: null,
    get_customers_loading: false,
    get_customers_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_GET_CUSTOMERS:
            return {
                ...state,
                get_customers: null,
                get_customers_loading: false,
                get_customers_error: null
            }
        case CLEAR_GET_CUSTOMERS_ERROR:
            return {
                ...state,
                get_customers_loading: false,
                get_customers_error: null
            }
        case GET_CUSTOMERS_LOADING:
            return {
                ...state,
                get_customers_loading: true,
                get_customers_error: null
            }
        case GET_CUSTOMERS_ERROR:
            return {
                ...state,
                get_customers_loading: true,
                get_customers_error: action.payload
            }
        case GET_CUSTOMERS:
            return {
                ...state,
                get_customers: action.payload,
                get_customers_loading: false,
                get_customers_error: null
            }
        default: return state;
    }
}