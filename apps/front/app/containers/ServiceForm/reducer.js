import produce from 'immer';
import {
  SERVICE_ERROR,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE,
  CHANGE_TITLE,
  CHANGE_DESCRIPTION,
  UPDATE_SERVICE,
  RESET_SERVICE,
  ADD_SERVICE,
} from './constants';
// The initial state of the App
export const initialState = {
  service: {
    id: '',
    title: '',
    description: '',
  },
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const serviceFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_SERVICE:
      case ADD_SERVICE:
      case LOAD_SERVICE:
        draft.loading = true;
        draft.error = false;
        draft.service = initialState.service;
        break;
      case LOAD_SERVICE_SUCCESS:
        draft.loading = false;
        draft.service = action.data;
        break;
      case SERVICE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case CHANGE_TITLE:
        draft.service.title = action.title;
        break;
      case CHANGE_DESCRIPTION:
        draft.service.description = action.description;
        break;
      case RESET_SERVICE:
        draft.service = initialState.service;
    }
  });

export default serviceFormReducer;
