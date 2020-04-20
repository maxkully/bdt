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
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const subscribersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SUBSCRIBERS:
        draft.loading = true;
        draft.error = false;
        draft.subscribers = false;
        break;

      case LOAD_SUBSCRIBERS_SUCCESS:
        draft.subscribers = action.subscribers;
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

export default subscribersReducer;
