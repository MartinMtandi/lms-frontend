import {CLEAR_GET_FIELD_AGENTS_ERROR, CLEAR_GET_FIELD_AGENTS, GET_FIELD_AGENTS_LOADING, GET_FIELD_AGENTS_ERROR, GET_FIELD_AGENTS} from '../actions/types';

const initialState = {
    get_field_agents: null,
    get_field_agents_loading: false,
    get_field_agents_error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case CLEAR_GET_FIELD_AGENTS_ERROR:
            return {
                ...state,
                get_field_agents_loading: false,
                get_field_agents_error: null
            }
        case CLEAR_GET_FIELD_AGENTS:
            return {
                ...state,
                get_field_agents: null,
                get_field_agents_loading: false,
                get_field_agents_error: null
            }
        case GET_FIELD_AGENTS_LOADING:
            return {
                ...state,
                get_field_agents_loading: true,
                get_field_agents_error: null
            }
        case GET_FIELD_AGENTS_ERROR:
            return {
                ...state,
                get_field_agents_loading: false,
                get_field_agents_error: action.payload
            }
        case GET_FIELD_AGENTS:
            return {
                ...state,
                get_field_agents: action.payload,
                get_field_agents_loading: false,
                get_field_agents_error: null
            }
        default: return state
    }
}