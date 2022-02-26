import {CLEAR_GET_MINISTRIES_ERROR, CLEAR_GET_MINISTRIES, GET_MINISTRIES_LOADING, GET_MINISTRIES_ERROR, GET_MINISTRIES} from '../actions/types';

const initialState = {
    ministries: null,
    ministries_loading: false,
    ministries_error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAR_GET_MINISTRIES_ERROR:
            return {
                ...state,
                ministries_loading: false,
                ministries_error: null,
            }
        case CLEAR_GET_MINISTRIES:
            return {
                ...state,
                ministries: null,
                ministries_loading: false,
                ministries_error: null,
            }
        case GET_MINISTRIES_LOADING:
            return {
                ...state,
                ministries_loading: true,
                ministries_error: null,
            }
        case GET_MINISTRIES_ERROR:
            return {
                ...state,
                ministries_loading: false,
                ministries_error: action.payload,
            }
        case GET_MINISTRIES:
            return {
                ...state,
                ministries: action.payload,
                ministries_loading: false,
                ministries_error: null,
            }
        default:
            return state;
    }
}