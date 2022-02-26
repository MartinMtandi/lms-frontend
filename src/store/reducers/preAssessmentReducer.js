import {CLEAR_PRE_ASSESSMENT_ERROR, CLEAR_PRE_ASSESSMENT, PRE_ASSESSMENT_LOADING,  PRE_ASSESSMENT_ERROR, PRE_ASSESSMENT} from '../actions/types';

const initialState = {
    pre_assessment: null,
    pre_assessment_loaded: false,
    pre_assessment_error: null,
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_PRE_ASSESSMENT:
            return {
                ...state,
                pre_assessment: null,
                pre_assessment_loaded: false,
                pre_assessment_error: null,
            }
        case CLEAR_PRE_ASSESSMENT_ERROR:
            return {
                ...state,
                pre_assessment_loaded: false,
                pre_assessment_error: null,
            }
        case PRE_ASSESSMENT_LOADING:
            return {
                ...state,
                pre_assessment_loaded: true,
                pre_assessment_error: null,
            }
        case PRE_ASSESSMENT_ERROR:
            return {
                ...state,
                pre_assessment_loaded: false,
                pre_assessment_error: action.payload,
            }
        case PRE_ASSESSMENT:
            return {
                ...state,
                pre_assessment: action.payload,
                pre_assessment_loaded: false,
                pre_assessment_error: null,
            }
        default: return state
    }
}