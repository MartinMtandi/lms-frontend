import {CLEAR_SUSPEND_FIELD_AGENT, CLEAR_SUSPEND_FIELD_AGENT_ERROR, SUSPEND_FIELD_AGENT_LOADING, SUSPEND_FIELD_AGENT_ERROR, SUSPEND_FIELD_AGENT} from '../actions/types';

const initialState = {
    suspend_field_agent: null,
    suspend_field_agent_error: null,
    suspend_field_agent_loading: false
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_SUSPEND_FIELD_AGENT:
            return {
                ...state,
                suspend_field_agent: null,
                suspend_field_agent_error: null,
                suspend_field_agent_loading: false
            }
        case CLEAR_SUSPEND_FIELD_AGENT_ERROR:
            return {
                ...state,
                suspend_field_agent_error: null,
                suspend_field_agent_loading: false
            }
        case SUSPEND_FIELD_AGENT_LOADING: 
            return {
                ...state,
                suspend_field_agent_error: null,
                suspend_field_agent_loading: true
            }
        case SUSPEND_FIELD_AGENT_ERROR:
            return {
                ...state,
                suspend_field_agent_error: action.payload,
                suspend_field_agent_loading: false
            }
        case SUSPEND_FIELD_AGENT:
            return {
                ...state,
                suspend_field_agent: action.payload,
                suspend_field_agent_error: null,
                suspend_field_agent_loading: false
            }
        default: return state
    }
}