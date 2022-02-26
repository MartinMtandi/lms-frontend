/* eslint-disable import/no-anonymous-default-export */
import {CUSTOMER_STATISTICS, CUSTOMER_STATISTICS_ERROR, SET_CUSTOMER_STATS_LOADING, CLEAR_CUSTOMER_STATS, CLEAR_CUSTOMER_STATS_ERROR} from '../actions/types';

const initialState = {
    customer_stats: null,
    customer_stats_loading: false,
    customer_stats_error: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case CUSTOMER_STATISTICS:
            return {
                ...state,
                customer_stats: action.payload,
                customer_stats_loading: false,
                customer_stats_error: null
            }
        case CUSTOMER_STATISTICS_ERROR:
            return {
                ...state,
                customer_stats_loading: false,
                customer_stats_error: action.payload
            }
        case SET_CUSTOMER_STATS_LOADING:
            return {
                ...state,
                customer_stats_loading: true,
                customer_stats_error: null
            }
        case CLEAR_CUSTOMER_STATS:
            return {
                ...state,
                customer_stats: null,
                customer_stats_loading: false,
                customer_stats_error: null
            }
        case CLEAR_CUSTOMER_STATS_ERROR:
            return {
                ...state,
                customer_stats_loading: false,
                customer_stats_error: null
            }
        default: return state
    }
}