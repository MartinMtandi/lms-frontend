/* eslint-disable import/no-anonymous-default-export */
import {CREATE_CLIENT_ERROR, CLEAR_CREATE_CLIENT, CREATE_CLIENT_LOADING, CLEAR_CREATE_CLIENT_ERROR, CREATE_CLIENT} from '../actions/types';

const initialState = {
    create_client: null,
    create_client_loading: false,
    create_client_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_CREATE_CLIENT_ERROR:
            return {
                ...state,
                create_client_loading: false,
                create_client_error: null
            }
        case CLEAR_CREATE_CLIENT:
            return {
                ...state,
                create_client: null,
                create_client_loading: false,
                create_client_error: null
            }
        case CREATE_CLIENT_LOADING:
            return {
                ...state,
                create_client_loading: true,
                create_client_error: null
            }
        case CREATE_CLIENT_ERROR:
            return {
                ...state,
                create_client_loading: false,
                create_client_error: action.payload
            }
        case CREATE_CLIENT:
            return {
                ...state,
                create_client: action.payload,
                create_client_loading: false,
                create_client_error: null
            }
        default: return state
    }
}