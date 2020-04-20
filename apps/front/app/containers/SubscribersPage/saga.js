import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOAD_SUBSCRIBERS, REMOVE_SUBSCRIBER } from './constants';
import { loadSubscribers, subscribersLoaded, subscribersLoadingError, subscriberRemoved, subscriberRemovingError } from './actions';

import request from 'utils/request';

export function* getSubscribers() {
  // Select username from store
  const requestURL = `http://localhost/api/subscribers`;

  try {
    // Call our request helper (see 'utils/request')
    const subscribers = yield call(request, requestURL);
    console.log('Loaded subscribers => ', subscribers);
    yield put(subscribersLoaded(subscribers));
  } catch (err) {
    yield put(subscribersLoadingError(err));
  }
}

export function* deleteSubscriber(data) {
  // Select username from store
  const requestURL = `http://localhost/api/subscribers/${data.id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    console.log(`Subscriber {${data.id}} successfully removed!`);
    yield put(subscriberRemoved());
    yield put(loadSubscribers());
  } catch (err) {
    yield put(subscriberRemovingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* subscribersData() {
  // Watches for LOAD_SUBSCRIBERS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SUBSCRIBERS, getSubscribers);
  yield takeEvery(REMOVE_SUBSCRIBER, deleteSubscriber);
}
