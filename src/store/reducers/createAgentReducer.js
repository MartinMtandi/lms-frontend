import {CLEAR_CREATE_AGENTS_ERROR, CLEAR_CREATE_AGENTS, CREATE_AGENTS_LOADING, CREATE_AGENTS_ERROR, CREATE_AGENTS} from '../actions/types';

const intitialState = {
    create_agent: null,
    create_agent_loading: false,
    create_agent_error: null
}

export default function (state = intitialState, action) {
    switch (action.type) {
        case CLEAR_CREATE_AGENTS_ERROR:
            return {
                ...state,
                create_agent_loading: false,
                create_agent_error: null
            }
        case CLEAR_CREATE_AGENTS:
            return {
                ...state,
                create_agent: null,
                create_agent_loading: false,
                create_agent_error: null
            }
        case CREATE_AGENTS_LOADING:
            return {
                ...state,
                create_agent_loading: true,
                create_agent_error: null
            }
        case CREATE_AGENTS_ERROR:
            return {
                ...state,
                create_agent_loading: false,
                create_agent_error: action.payload
            }
        case CREATE_AGENTS:
            return {
                ...state,
                create_agent: action.payload,
                create_agent_loading: false,
                create_agent_error: null
            }
        default:
            return state;
    }
}