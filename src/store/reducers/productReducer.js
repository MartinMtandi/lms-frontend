import { CLEAR_GET_PRODUCTS_ERROR, CLEAR_GET_PRODUCTS, GET_PRODUCTS_LOADING, GET_PRODUCTS_ERROR, GET_PRODUCTS} from '../actions/types';

const initialState = {
    prod: null,
    prod_error: null,
    prod_loading: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_GET_PRODUCTS_ERROR:
            return {
                ...state,
                prod_error: null,
                prod_loading: false
            }
        case CLEAR_GET_PRODUCTS:
            return {
                ...state,
                prod: null,
                prod_error: null,
                prod_loading: false
            }
        case GET_PRODUCTS_LOADING:
            return {
                ...state,
                prod_error: null,
                prod_loading: true
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                prod: null,
                prod_error: action.payload,
                prod_loading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                prod: action.payload,
                prod_error: null,
                prod_loading: false
            }
        default:
            return state
    }
}