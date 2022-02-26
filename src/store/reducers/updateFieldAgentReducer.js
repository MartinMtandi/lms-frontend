import {CLEAR_UPDATE_FIELD_AGENT_ERROR, CLEAR_UPDATE_FIELD_AGENT, UPDATE_FIELD_AGENTS_LOADING, UPDATE_FIELD_AGENTS_ERROR, UPDATE_FIELD_AGENTS} from '../actions/types';

const initialState = {
    update_field_agent: null,
    update_field_agent_loading: false,
    update_field_agent_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_UPDATE_FIELD_AGENT_ERROR:
            return {
                ...state,
                update_field_agent_loading: false,
                update_field_agent_error: null
            }
        case CLEAR_UPDATE_FIELD_AGENT:
            return {
                ...state,
                update_field_agent: null,
                update_field_agent_loading: false,
                update_field_agent_error: null
            }
        case UPDATE_FIELD_AGENTS_LOADING:
            return {
                ...state,
                update_field_agent_loading: true,
                update_field_agent_error: null
            }
        case UPDATE_FIELD_AGENTS_ERROR:
            return {
                ...state,
                update_field_agent_loading: false,
                update_field_agent_error: action.payload
            }
        case UPDATE_FIELD_AGENTS:
            return {
                ...state,
                update_field_agent: action.payload,
                update_field_agent_loading: false,
                update_field_agent_error: null
            }
        default: return state
    }
}