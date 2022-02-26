/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_CREDIT_ASSESSMENT_ERROR, CLEAR_CREDIT_ASSESSMENT, CREDT_ASSESSMENT_LOADING, CREDIT_ASSESSMENT_ERROR, CREDIT_ASSESSMENT } from '../actions/types';

const initialState = {
    credit_assessment: null,
    credit_assessment_error: null,
    credit_assessment_loading: false
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_CREDIT_ASSESSMENT_ERROR:
            return {
                ...state,
                credit_assessment_error: null,
                credit_assessment_loading: false
            }
        case CLEAR_CREDIT_ASSESSMENT:
            return {
                ...state,
                credit_assessment: null,
                credit_assessment_error: null,
                credit_assessment_loading: false
            }
        case CREDT_ASSESSMENT_LOADING:
            return {
                ...state,
                credit_assessment_error: null,
                credit_assessment_loading: true
            }
        case CREDIT_ASSESSMENT_ERROR:
            return {
                ...state,
                credit_assessment_error: action.payload,
                credit_assessment_loading: false
            }
        case CREDIT_ASSESSMENT:
            return {
                ...state,
                credit_assessment: action.payload,
                credit_assessment_error: null,
                credit_assessment_loading: false
            }
        default: return state
    }
}
