/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSubscriberForm = state => state.subscriberForm || initialState;

const makeSelectSubscriber = () =>
  createSelector(
    selectSubscriberForm,
    subscriberFormState => subscriberFormState.subscriber,
  );

export { selectSubscriberForm, makeSelectSubscriber };
