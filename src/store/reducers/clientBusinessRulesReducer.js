import { CLEAR_CLIENT_BUSINESS_RULES_ERROR, CLEAR_CLIENT_BUSINESS_RULES, SET_CLIENT_BUSINESS_RULES_LOADING, GET_CLIENT_BUSINESS_RULES_ERROR, GET_CLIENT_BUSINESS_RULES} from '../actions/types';

const initialState = {
    business_rules: null,
    business_rules_loading: false,
    business_rules_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_CLIENT_BUSINESS_RULES_ERROR:
            return {
                ...state,
                business_rules_loading: false,
                business_rules_error: null
            }
        case CLEAR_CLIENT_BUSINESS_RULES:
            return {
                ...state,
                business_rules: null,
                business_rules_loading: false,
                business_rules_error: null
            }
        case SET_CLIENT_BUSINESS_RULES_LOADING:
            return {
                ...state,
                business_rules_loading: true,
                business_rules_error: null
            }
        case GET_CLIENT_BUSINESS_RULES_ERROR:
            return {
                ...state,
                business_rules_loading: false,
                business_rules_error: action.payload
            }
        case GET_CLIENT_BUSINESS_RULES:
            return {
                ...state,
                business_rules: action.payload,
                business_rules_loading: false,
                business_rules_error: null
            }
        default: return state
    }
}