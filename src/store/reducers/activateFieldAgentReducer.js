import {CLEAR_ACTIVATE_FIELD_AGENT, CLEAR_ACTIVATE_FIELD_AGENT_ERROR, ACTIVATE_FIELD_AGENT_LOADING, ACTIVATE_FIELD_AGENT_ERROR, ACTIVATE_FIELD_AGENT} from '../actions/types';

const initialState = {
    activate_field_agent: null,
    activate_field_agent_error: null,
    activate_field_agent_loading: false
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_ACTIVATE_FIELD_AGENT:
            return {
                ...state,
                activate_field_agent: null,
                activate_field_agent_error: null,
                activate_field_agent_loading: false
            }
        case CLEAR_ACTIVATE_FIELD_AGENT_ERROR:
            return {
                ...state,
                activate_field_agent_error: null,
                activate_field_agent_loading: false
            }
        case ACTIVATE_FIELD_AGENT_LOADING: 
            return {
                ...state,
                activate_field_agent_error: null,
                activate_field_agent_loading: true
            }
        case ACTIVATE_FIELD_AGENT_ERROR:
            return {
                ...state,
                activate_field_agent_error: action.payload,
                activate_field_agent_loading: false
            }
        case ACTIVATE_FIELD_AGENT:
            return {
                ...state,
                activate_field_agent: action.payload,
                activate_field_agent_error: null,
                activate_field_agent_loading: false
            }
        default: return state
    }
}