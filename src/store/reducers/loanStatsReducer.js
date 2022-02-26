/* eslint-disable import/no-anonymous-default-export */
import {CLEAR_LOAN_STATS, SET_LOAN_STATS_LOADING, CLEAR_LOAN_STATS_ERROR, FETCH_LOAN_STATISTICS_ERROR, FETCH_LOAN_STATISTICS} from '../actions/types';

const initialState = {
    loan_stats: null,
    loan_stats_loading: false,
    loan_stats_error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_LOAN_STATS:
            return {
                ...state,
                loan_stats: null,
                loan_stats_loading: false,
                loan_stats_error: null
            }
        case SET_LOAN_STATS_LOADING:
            return {
                ...state,
                loan_stats_loading: true,
                loan_stats_error: null
            }
        case CLEAR_LOAN_STATS_ERROR:
            return {
                ...state,
                loan_stats_loading: false,
                loan_stats_error: null
            }
        case FETCH_LOAN_STATISTICS_ERROR:
            return {
                ...state,
                loan_stats_loading: false,
                loan_stats_error: action.payload
            }
        case FETCH_LOAN_STATISTICS:
            return {
                ...state,
                loan_stats: action.payload,
                loan_stats_loading: false,
                loan_stats_error: null
            }
        default: return state
    }
}