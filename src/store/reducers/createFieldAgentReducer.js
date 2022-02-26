import {CLEAR_CREATE_FIELD_AGENT, CLEAR_CREATE_FIELD_AGENT_ERROR, CREATE_FIELD_AGENT_LOADING, CREATE_FIELD_AGENT_ERROR, CREATE_FIELD_AGENT} from '../actions/types';

const initialState = {
    field_agent: null,
    field_agent_loading: false,
    field_agent_error: null,
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_CREATE_FIELD_AGENT:
            return {
                ...state,
                field_agent: null,
                field_agent_loading: false,
                field_agent_error: null,
            }
        case CLEAR_CREATE_FIELD_AGENT_ERROR:
            return {
                ...state,
                field_agent_loading: false,
                field_agent_error: null,
            }
        case CREATE_FIELD_AGENT_LOADING:
            return {
                ...state,
                field_agent_loading: true,
                field_agent_error: null,
            }
        case CREATE_FIELD_AGENT_ERROR:
            return {
                ...state,
                field_agent_loading: false,
                field_agent_error: action.payload,
            }
        case CREATE_FIELD_AGENT:
            return {
                ...state,
                field_agent: action.payload,
                field_agent_loading: false,
                field_agent_error: null,
            }
        default:
            return state;
    }
}