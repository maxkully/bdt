import produce from 'immer';
import {
  REMOVE_SERVICE,
  LOAD_SERVICES_ERROR,
  LOAD_SERVICES_SUCCESS,
  LOAD_SERVICES,
} from './constants';

// The initial state of the App
export const initialState = {
  services: [],
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const servicesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SERVICES:
      case REMOVE_SERVICE:
        draft.loading = true;
        draft.error = false;
        draft.services = initialState.services;
        break;

      case LOAD_SERVICES_SUCCESS:
        draft.services = action.services;
        draft.loading = false;
        break;

      case LOAD_SERVICES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default servicesReducer;
