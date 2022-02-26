/* eslint-disable import/no-anonymous-default-export */
import {CLEAR_GET_CLIENTS, CLEAR_GET_CLIENTS_ERROR, GET_CLIENTS_LOADING, GET_CLIENTS_ERROR, GET_CLIENTS} from '../actions/types';

const initialState = {
    get_clients: null,
    get_clients_loading: false,
    get_clients_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_GET_CLIENTS:
            return {
                ...state,
                get_clients: null,
                get_clients_loading: false,
                get_clients_error: null
            }
        case CLEAR_GET_CLIENTS_ERROR:
            return {
                ...state,
                get_clients_loading: false,
                get_clients_error: null
            }
        case GET_CLIENTS_LOADING:
            return {
                ...state,
                get_clients_loading: true,
                get_clients_error: null
            }
        case GET_CLIENTS_ERROR:
            return {
                ...state,
                get_clients_loading: true,
                get_clients_error: action.payload
            }
        case GET_CLIENTS:
            return {
                ...state,
                get_clients: action.payload,
                get_clients_loading: false,
                get_clients_error: null
            }
        default: return state;
    }
}