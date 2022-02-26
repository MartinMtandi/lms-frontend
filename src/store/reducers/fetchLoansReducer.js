/* eslint-disable import/no-anonymous-default-export */
import { SET_FETCH_LOANS_LOADING, CLEAR_FETCH_LOANS, CLEAR_FETCH_LOANS_ERROR, FETCH_ALL_LOANS_ERROR, FETCH_ALL_LOANS } from '../actions/types';

const initialState = {
    loans: null,
    loans_Loading: false,
    loans_error: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case SET_FETCH_LOANS_LOADING:
           return {
                ...state,
                loans_Loading: true,
                loans_error: null
           } 
        case CLEAR_FETCH_LOANS:
            return {
                ...state,
                loans: null,
                loans_Loading: false,
                loans_error: null
            }
        case CLEAR_FETCH_LOANS_ERROR:
            return {
                ...state,
                loans_Loading: false,
                loans_error: null
            }
        case FETCH_ALL_LOANS_ERROR:
            return {
                ...state,
                loans_Loading: false,
                loans_error: action.payload
            }
        case FETCH_ALL_LOANS:
            return {
                ...state,
                loans: action.payload,
                loans_Loading: false,
                loans_error: null
            }
        default: return state
    }
}