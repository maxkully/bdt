import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import {
  loadSubscriber,
  subscriberLoaded,
  subscriberRequestingError,
} from './actions';
import {
  LOAD_SUBSCRIBER,
  REMOVE_SUBSCRIBER,
  DISABLE_SERVICE,
} from './constants';

export function* getSubscriber(data) {
  console.log('[getSubscriber] with data => ', data);
  // Select username from store
  const requestURL = `http://localhost/api/subscribers/${data.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(subscriberLoaded(response));
  } catch (err) {
    yield put(subscriberRequestingError(err));
  }
}

export function* deleteSubscriber(data) {
  const requestURL = `http://localhost/api/subscribers/${data.id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    console.log(`Subscriber {${data.id}} successfully removed!`);
    yield put(push('/subscribers'));
  } catch (err) {
    yield put(subscriberRequestingError(err));
  }
}

export function* disableServiceForSubscriber(data) {
  const requestURL = `http://localhost/api/subscribers/${
    data.data.subscriber_id
  }/services/${data.data.service_id}`;

  try {
    yield call(request, requestURL, { method: 'DELETE' });
    console.log(
      `Service {${data.data.service_id}} successfully removed for subscriber {${
        data.data.subscriber_id
      }}!`,
    );
    yield put(loadSubscriber(data.data.subscriber_id));
  } catch (err) {
    yield put(subscriberRequestingError(err));
  }
}

export default function* subscriberData() {
  yield all([
    takeEvery(REMOVE_SUBSCRIBER, deleteSubscriber),
    takeLatest(LOAD_SUBSCRIBER, getSubscriber),
    takeEvery(DISABLE_SERVICE, disableServiceForSubscriber),
  ]);
}
