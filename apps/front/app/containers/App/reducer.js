import produce from 'immer';
import {LOAD_SUBSCRIBERS_ERROR, REMOVE_SUBSCRIBER_SUCCESS} from '../SubscribersPage/constants';
import {
  DISABLE_SERVICE,
  LOAD_SUBSCRIBER,
  LOAD_SUBSCRIBER_SUCCESS,
  REMOVE_SUBSCRIBER,
  SUBSCRIBER_ERROR
} from "../SubscriberCard/constants";
import {DISABLE_SERVICE_SUCCESS, ENABLE_SERVICE_SUCCESS} from "./constants";

// The initial state of the App
export const initialState = {
  loading: true,
  errors: [],
  notifications: [],
  currentUser: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SUBSCRIBERS_ERROR:
        draft.errors = action.errors;
        break;
      case REMOVE_SUBSCRIBER_SUCCESS:
        draft.notifications = [{ message: 'subscriber-removed-successfully' }];
        break;
      case LOAD_SUBSCRIBER:
        draft.loading = true;
        break;
      case LOAD_SUBSCRIBER_SUCCESS:
        draft.loading = false;
        break;
      case SUBSCRIBER_ERROR:
        draft.errors = action.errors;
        draft.loading = false;
        break;
      case REMOVE_SUBSCRIBER:
        draft.loading = true;
        break;
      case DISABLE_SERVICE:
        draft.loading = true;
        break;
      case ENABLE_SERVICE_SUCCESS:
        draft.notifications = [{ message: 'subscriber.service.enable' }];
        break;
      case DISABLE_SERVICE_SUCCESS:
        draft.notifications = [{ message: 'subscriber.service.disable' }];
        break;
    }
  });

export default appReducer;
