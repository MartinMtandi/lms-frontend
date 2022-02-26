import {CLEAR_LOAN_STRUCTURE_ERROR, CLEAR_LOAN_STRUCTURE, LOAN_STRUCTURE_LOADING,  LOAN_STRUCTURE_ERROR, LOAN_STRUCTURE} from '../actions/types';

const initialValues = {
    loan_structure: null,
    loan_structure_loading: false,
    loan_structure_error: null
}

export default function(state = initialValues, action){
    switch (action.type) {
        case CLEAR_LOAN_STRUCTURE_ERROR:
            return {
                ...state,
                loan_structure_loading: false,
                loan_structure_error: null
            }
        case CLEAR_LOAN_STRUCTURE:
            return {
                ...state,
                loan_structure: null,
                loan_structure_loading: false,
                loan_structure_error: null
            }
        case LOAN_STRUCTURE_LOADING:
            return {
                ...state,
                loan_structure_loading: true,
                loan_structure_error: null
            }
        case LOAN_STRUCTURE_ERROR:
            return {
                ...state,
                loan_structure_loading: false,
                loan_structure_error: action.payload
            }
        case LOAN_STRUCTURE:
            return {
                ...state,
                loan_structure: action.payload,
                loan_structure_loading: false,
                loan_structure_error: null
            }
        default: 
            return state;
    }
}