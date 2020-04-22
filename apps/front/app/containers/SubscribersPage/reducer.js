import produce from 'immer';
import {
  LOAD_SUBSCRIBERS,
  LOAD_SUBSCRIBERS_ERROR,
  LOAD_SUBSCRIBERS_SUCCESS,
  REMOVE_SUBSCRIBER,
  REMOVE_SUBSCRIBER_ERROR,
  REMOVE_SUBSCRIBER_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  subscribers: [],
  query: {
    paging: {
      limit: 5,
      offset: 0,
    },
    sorting: {
      field: 'created_at',
      direction: 'desc',
    },
    filter: {
      phone: '',
      created_at: {
        from: new Date().toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
      },
    },
  },
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const subscribersPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SUBSCRIBERS:
        draft.loading = true;
        draft.error = false;
        draft.subscribers = [];
        break;
      case LOAD_SUBSCRIBERS_SUCCESS:
        draft.subscribers = action.response.subscribers;
        draft.query = action.response.query || initialState.query;
        draft.loading = false;
        break;
      case LOAD_SUBSCRIBERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case REMOVE_SUBSCRIBER:
        draft.loading = true;
        draft.error = false;
        break;
      case REMOVE_SUBSCRIBER_SUCCESS:
        draft.loading = false;
        break;
      case REMOVE_SUBSCRIBER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default subscribersPageReducer;
