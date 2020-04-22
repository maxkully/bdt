import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_SERVICES, REMOVE_SERVICE, ENABLE_SERVICE } from './constants';
import {
  loadServices,
  servicesLoaded,
  servicesRequestingError,
} from './actions';

export function* getServices() {
  // Select username from store
  const requestURL = `http://localhost/api/services`;

  try {
    // Call our request helper (see 'utils/request')
    const services = yield call(request, requestURL);
    console.log('Loaded services => ', services);
    yield put(servicesLoaded(services));
  } catch (err) {
    yield put(servicesRequestingError(err));
  }
}

export function* deleteService(data) {
  // Select username from store
  const requestURL = `http://localhost/api/services/${data.id}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });
    console.log(`Service {${data.id}} successfully removed!`);
    yield put(loadServices());
  } catch (err) {
    yield put(servicesRequestingError(err));
  }
}

export function* enableServiceForSubscriber(data) {
  const requestURL = `http://localhost/api/subscribers/${
    data.data.subscriber_id
  }/services/${data.data.service_id}`;

  try {
    yield call(request, requestURL, { method: 'PUT' });
    console.log(
      `Service {${data.data.service_id}} successfully enabled for {${
        data.data.subscriber_id
      }}!`,
    );
    yield put(loadServices());
  } catch (err) {
    yield put(servicesRequestingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* servicesData() {
  yield takeLatest(LOAD_SERVICES, getServices);
  yield takeEvery(REMOVE_SERVICE, deleteService);
  yield takeEvery(ENABLE_SERVICE, enableServiceForSubscriber);
}
