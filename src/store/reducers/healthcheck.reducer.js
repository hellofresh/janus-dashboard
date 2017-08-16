import {
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
} from '../constants';

const initialState = {
    //
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_HEALTHCHECK_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case FETCH_HEALTHCHECK_SUCCESS: {
            return {
                ...state,
                apiList: action.payload,
                isFetching: false,
            };
        }
        default:
            return state;
    }
}