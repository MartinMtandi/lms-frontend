import {CLEAR_FIELD_AGENTS_LOANS_ERROR, CLEAR_FIELD_AGENTS_LOANS, FIELD_AGENTS_LOANS_LOADING, FIELD_AGENTS_LOANS_ERROR, FIELD_AGENTS_LOANS} from '../actions/types';

const initialState = {
    field_agent_loans: null,
    field_agent_loans_loading: false,
    field_agent_loans_error: null,
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_FIELD_AGENTS_LOANS_ERROR:
            return {
                ...state,
                field_agent_loans_loading: false,
                field_agent_loans_error: null,
            }
        case CLEAR_FIELD_AGENTS_LOANS:
            return {
                ...state,
                field_agent_loans: null,
                field_agent_loans_loading: false,
                field_agent_loans_error: null,
            }
        case FIELD_AGENTS_LOANS_LOADING:
            return {
                ...state,
                field_agent_loans_loading: true,
                field_agent_loans_error: null,
            }
        case FIELD_AGENTS_LOANS_ERROR:
            return {
                ...state,
                field_agent_loans_loading: false,
                field_agent_loans_error: action.payload,
            }
        case FIELD_AGENTS_LOANS:
            return {
                ...state,
                field_agent_loans: action.payload,
                field_agent_loans_loading: false,
                field_agent_loans_error: null,
            }
        default:
            return state
    }
}