import R from 'ramda';
import client from '../api';
import {
    CLEAR_HEALTHCHECK_DETAILS,
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../constants';
import {
    openResponseModal,
} from './index';

export const objectToArray = obj => {
    const list = R.keys(obj).reduce((acc, key) => {
        const o = {
            name: key,
            message: obj[key],
        };

        acc.push(o);

        return acc;
    }, []);

    return list;
};

export const getHealthcheckListRequest = () => ({
    type: FETCH_HEALTHCHECK_LIST_START,
});

export const getHealthcheckListSuccess = (status, failures) => ({
    type: FETCH_HEALTHCHECK_LIST_SUCCESS,
    payload: { status, failures },
});

export const getHealthcheckRequest = () => ({
    type: FETCH_HEALTHCHECK_START,
});

export const getHealthcheckSuccess = (name, status, list) => ({
    type: FETCH_HEALTHCHECK_SUCCESS,
    payload: { name, status, list },
});

export const clearHealthCheckDetails = () => ({
    type: CLEAR_HEALTHCHECK_DETAILS,
});

export const discardPagination = () => ({
    type: DISCARD_PAGINATION,
});

export const setCurrentPageIndex = index => ({
    type: SET_PAGINATION_PAGE,
    payload: index,
});

export const setSortingFilter = filter => ({
    type: SET_SORTING_FILTER,
    payload: filter,
});

export const setAscendingFilter = () => ({
    type: SET_ASCEND_FILTER,
});

export const fetchHealthCheckList = () => async (dispatch) => {
    dispatch(getHealthcheckListRequest());

    try {
        const response = await client.get('status');
        const { failures, status } = response.data;

        dispatch(getHealthcheckListSuccess(status, failures));
    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};

export const fetchHealthCheckItem = name => async (dispatch) => {
    dispatch(getHealthcheckRequest());

    try {
        const response = await client.get(`status/${name}`);
        /**
         * @TODO: remove when this mock won't be needed anymore
         */
        // const mockResponse = {
        //     'request': {
        //         'method': 'GET',
        //         'urlPath': '/status-partial'
        //     },
        //     'response': {
        //         'status': 400,
        //         'headers': {
        //             'Content-Type': 'application/json; charset=utf-8'
        //         },
        //         'jsonBody': {
        //             'status': 'Partially Available',
        //             'timestamp': '2017-07-03T14:48:14.563630521Z',
        //             'failures': {
        //                 'rabbitmq': 'Failed during RabbitMQ health check',
        //                 'someAnotherService': 'Failed during someAnotherService health check',
        //                 'yetAnotherService-1': 'Failed during yetAnotherService health check',
        //                 'lastButNotLeastService': 'Failed during lastButNotLeastService health check'
        //             },
        //             'system': {
        //                 'version': 'go1.8.3',
        //                 'goroutines_count': 15,
        //                 'total_alloc_bytes': 46186776,
        //                 'heap_objects_count': 44186,
        //                 'alloc_bytes': 5733552
        //             }
        //         }
        //     }
        // };
        // const { response } = mockResponse;

        dispatch(
            getHealthcheckSuccess(
                name,
                response.jsonBody.status,
                objectToArray(response.jsonBody.failures)
            )
        );
    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};