/* eslint-disable import/no-anonymous-default-export */
import {AUTH_LOADING, AUTH, AUTH_ERROR, CLEAR_AUTH, CLEAR_AUTH_ERROR} from '../actions/types';

const initialState = { authenticated: false, user: null, user_loading: false, user_error: null }

export default function (state = initialState, action){
    switch (action.type) {
        case AUTH_LOADING:
           return {
               ...state,
               user_error: null, 
               user_loading: true
           }
        case AUTH:
            return {
                ...state,
                authenticated: true,
                user_error: null, 
                user_loading: false, 
                user: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                user_error: action.payload, 
                user_loading: false, 
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                user_error: null, 
                user_loading: false
            }
        case CLEAR_AUTH:
            return {
                ...state,
                authenticated: false,
                user_error: null, 
                user_loading: false, 
                user: null
            }
        default: return state
    }
}