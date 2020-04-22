import produce from 'immer';
import {
  SUBSCRIBER_ERROR,
  LOAD_SUBSCRIBER,
  LOAD_SUBSCRIBER_SUCCESS,
  ADD_SUBSCRIBER,
  UPDATE_SUBSCRIBER,
  CHANGE_LOCALE,
  CHANGE_PHONE,
  RESET_SUBSCRIBER,
} from './constants';

// The initial state of the App
export const initialState = {
  subscriber: {
    id: '',
    phone: '',
    locale: '',
  },
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const subscriberFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_SUBSCRIBER:
      case ADD_SUBSCRIBER:
      case LOAD_SUBSCRIBER:
        draft.loading = true;
        draft.error = false;
        draft.subscriber = initialState.subscriber;
        break;
      case LOAD_SUBSCRIBER_SUCCESS:
        draft.loading = false;
        draft.subscriber = action.data;
        break;
      case SUBSCRIBER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CHANGE_PHONE:
        draft.subscriber.phone = action.phone;
        break;
      case CHANGE_LOCALE:
        draft.subscriber.locale = action.locale;
        break;
      case RESET_SUBSCRIBER:
        draft.subscriber = initialState.subscriber;
        draft.loading = false;
    }
  });

export default subscriberFormReducer;
