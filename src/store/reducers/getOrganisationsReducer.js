/* eslint-disable import/no-anonymous-default-export */
import {  CLEAR_ORGANISATION_ERROR, CLEAR_ORGANISATIONS, GET_ORGANISATION_LOADING, GET_ORGANISATIONS_ERROR, GET_ORGANISATIONS } from '../actions/types';

const initialState = {
    get_org: null,
    get_org_error: null,
    get_org_loading: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case CLEAR_ORGANISATION_ERROR:
            return {
                ...state,
                get_org_error: null,
                get_org_loading: false
            }
        case CLEAR_ORGANISATIONS:
            return {
                ...state,
                get_org: null,
                get_org_error: null,
                get_org_loading: false
            }
        case GET_ORGANISATION_LOADING:
            return {
                ...state,
                get_org_error: null,
                get_org_loading: true
            }
        case GET_ORGANISATIONS_ERROR:
            return {
                ...state,
                get_org_error: action.payload,
                get_org_loading: false
            }
        case GET_ORGANISATIONS:
            return {
                ...state,
                get_org: action.payload,
                get_org_error: null,
                get_org_loading: false
            }
        default: return state;
    }
}