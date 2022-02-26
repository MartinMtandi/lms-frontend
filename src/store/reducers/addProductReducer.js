import { CLEAR_ADD_PRODUCT_ERROR, ADD_PRODUCT_LOADING, CLEAR_ADD_PRODUCT,ADD_PRODUCT_ERROR, ADD_PRODUCT } from '../actions/types';

const initialValues = {
    add_product: null,
    add_product_loading: false,
    add_product_error: null
}

export default function(state = initialValues, action){
    switch (action.type) {
        case CLEAR_ADD_PRODUCT_ERROR:
            return {
                ...state,
                add_product_loading: false,
                add_product_error: null
            }
        case ADD_PRODUCT_LOADING:
            return {
                ...state,
                add_product_loading: true,
                add_product_error: null
            }
        case CLEAR_ADD_PRODUCT:
            return {
                ...state,
                add_product: null,
                add_product_loading: false,
                add_product_error: null
            }
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                add_product_loading: false,
                add_product_error: action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                add_product: action.payload,
                add_product_loading: false,
                add_product_error: null
            }
        default:
            return state;
    }
} 