/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSubscribers = state => state.subscribers || initialState;

const makeSelectSubscribers = () =>
  createSelector(
    selectSubscribers,
    subscribersState => subscribersState.subscribers,
  );

export { selectSubscribers, makeSelectSubscribers };
