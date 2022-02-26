import { CLEAR_GET_AGENTS_ERROR, CLEAR_GET_AGENTS, GET_AGENTS_LOADING, GET_AGENTS_ERROR, GET_AGENTS } from '../actions/types';

const initialState = {
    agents: null,
    agents_loading: false,
    agents_error: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_GET_AGENTS_ERROR:
            return {
                ...state,
                agents_loading: false,
                agents_error: null
            }
        case CLEAR_GET_AGENTS:
            return {
                ...state,
                agents: null,
                agents_loading: false,
                agents_error: null
            }
        case GET_AGENTS_LOADING:
            return {
                ...state,
                agents_loading: true,
                agents_error: null
            }
        case GET_AGENTS_ERROR:
            return {
                ...state,
                agents_loading: false,
                agents_error: action.payload
            }
        case GET_AGENTS:
            return {
                ...state,
                agents: action.payload,
                agents_loading: false,
                agents_error: null
            }
        default:
            return state;
    }
}