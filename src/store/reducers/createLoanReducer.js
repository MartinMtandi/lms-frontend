/* eslint-disable import/no-anonymous-default-export */
import {CLEAR_CREATE_LOAN_ERROR, CLEAR_CREATE_LOAN, CREATE_LOAN_LOADING, CREATE_LOAN_ERROR, CREATE_LOAN} from '../actions/types';

const initialState = {
    create_loan: null,
    create_loan_loading: false,
    create_loan_error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case CLEAR_CREATE_LOAN_ERROR:
            return {
                ...state,
                create_loan_loading: false,
                create_loan_error: null
            }
        case CLEAR_CREATE_LOAN:
            return {
                ...state,
                create_loan: null,
                create_loan_loading: false,
                create_loan_error: null
            }
        case CREATE_LOAN_LOADING:
            return {
                ...state,
                create_loan_loading: true,
                create_loan_error: null
            }
        case CREATE_LOAN_ERROR:
            return {
                ...state,
                create_loan_loading: false,
                create_loan_error: action.payload
            }
        case CREATE_LOAN:
            return {
                ...state,
                create_loan: action.payload,
                create_loan_loading: false,
                create_loan_error: null
            }
        default: return state
    }
}