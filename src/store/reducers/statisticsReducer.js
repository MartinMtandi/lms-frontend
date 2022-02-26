/* eslint-disable import/no-anonymous-default-export */
import {CLEAR_STATISTICS_ERROR, CLEAR_STATISTICS, SET_STATISTICS_LOADING, FETCH_STATISTICS_ERROR, FETCH_STATISTICS} from '../actions/types';

const initialState = {
    stats: null,
    stats_loading: false,
    stats_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_STATISTICS_ERROR:
            return {
                ...state,
                stats_loading: false,
                stats_error: null
            }
        case CLEAR_STATISTICS:
            return {
                ...state,
                stats: null,
                stats_loading: false,
                stats_error: null
            }
        case SET_STATISTICS_LOADING:
            return {
                ...state,
                stats_loading: true,
                stats_error: null
            }
        case FETCH_STATISTICS_ERROR:
            return {
                ...state,
                stats_loading: false,
                stats_error: action.payload
            }
        case FETCH_STATISTICS:
            return {
                ...state,
                stats: action.payload,
                stats_loading: false,
                stats_error: null
            }
        default: return state
    }
}