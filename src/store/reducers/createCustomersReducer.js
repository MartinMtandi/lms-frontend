import { CLEAR_CREATE_CUSTOMER_ERROR, CLEAR_CREATE_CUSTOMER, CREATE_CUSTOMER_LOADING, CREATE_CUSTOMER_ERROR, CREATE_CUSTOMER } from '../actions/types';

const initialState = {
    create_customer: null,
    create_customer_loading: false,
    create_customer_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                create_customer_loading: false,
                create_customer_error: null
            }
        case CLEAR_CREATE_CUSTOMER:
            return {
                ...state,
                create_customer: null,
                create_customer_loading: false,
                create_customer_error: null
            }
        case CREATE_CUSTOMER_LOADING:
            return {
                ...state,
                create_customer_loading: true,
                create_customer_error: null
            }
        case CREATE_CUSTOMER_ERROR:
            return {
                ...state,
                create_customer_loading: false,
                create_customer_error: action.payload
            }
        case CREATE_CUSTOMER:
            return {
                ...state,
                create_customer: action.payload,
                create_customer_loading: false,
                create_customer_error: null
            }
        default: return state
    }
}