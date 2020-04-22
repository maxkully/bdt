/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSubscribersPage = state => state.subscribersPage || initialState;

const makeSelectSubscribers = () =>
  createSelector(
    selectSubscribersPage,
    subscribersState => subscribersState.subscribers,
  );

const makeSelectQuery = () =>
  createSelector(
    selectSubscribersPage,
    subscribersState => subscribersState.query,
  );

export { selectSubscribersPage, makeSelectSubscribers, makeSelectQuery };
