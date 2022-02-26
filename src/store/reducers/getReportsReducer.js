import {CLEAR_REPORTS, CLEAR_REPORTS_ERROR, GET_REPORTS_LOADING, GET_REPORTS_ERROR, GET_REPORTS} from '../actions/types';

const initialValues = {
    dashboard_reports: null,
    dashboard_reports_error: null,
    dashboard_reports_loading: false
}

export default function (state=initialValues, action) {
    switch (action.type) {
        case CLEAR_REPORTS:
            return {
                ...state,
                dashboard_reports: null,
                dashboard_reports_error: null,
                dashboard_reports_loading: false
            }
        case CLEAR_REPORTS_ERROR:
            return {
                ...state,
                dashboard_reports_error: null,
                dashboard_reports_loading: false
            }
        case GET_REPORTS_LOADING:
            return {
                ...state,
                dashboard_reports_error: null,
                dashboard_reports_loading: true
            }
        case GET_REPORTS_ERROR:
            return {
                ...state,
                dashboard_reports_error: action.payload,
                dashboard_reports_loading: false
            }
        case GET_REPORTS: 
            return {
                ...state,
                dashboard_reports: action.payload,
                dashboard_reports_error: null,
                dashboard_reports_loading: false
            }
        default:
            return state;
    }
}