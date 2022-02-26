import {CLEAR_UPDATE_BUSINESS_RULES, CLEAR_UPDATE_BUSINESS_RULES_ERROR, UPDATE_BUSINESS_RULES_LOADING, UPDATE_BUSINESS_RULES_ERROR, UPDATE_BUSINESS_RULES} from '../actions/types';

const initialState = {
    update_rules: null,
    update_rules_error: null,
    update_rules_loading: false,
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_UPDATE_BUSINESS_RULES:
            return {
                ...state,
                update_rules: null,
                update_rules_error: null,
                update_rules_loading: false,
            }
        case CLEAR_UPDATE_BUSINESS_RULES_ERROR:
            return {
                ...state,
                update_rules_error: null,
                update_rules_loading: false,
            }
        case UPDATE_BUSINESS_RULES_LOADING:
            return {
                ...state,
                update_rules_error: null,
                update_rules_loading: true,
            }
        case UPDATE_BUSINESS_RULES_ERROR:
            return {
                ...state,
                update_rules_error: action.payload,
                update_rules_loading: false,
            }
        case UPDATE_BUSINESS_RULES:
            return {
                ...state,
                update_rules: action.payload,
                update_rules_error: null,
                update_rules_loading: false,
            }
        default: return state
    }
}