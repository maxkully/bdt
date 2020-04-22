import produce from 'immer';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {});

export default appReducer;
