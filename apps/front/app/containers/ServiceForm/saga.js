import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import { UPDATE_SERVICE, ADD_SERVICE, LOAD_SERVICE } from './constants';
import {
  serviceLoaded,
  loadService,
  serviceRequestingError,
} from './actions';

export function* addService(data) {
  // Select username from store
  const requestURL = `http://localhost/api/services`;

  try {
    // Call our request helper (see 'utils/request')
    console.log('addService with body => ', data);
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data.service),
    });
    console.log(`Add service '${response.title}' successfully`, response);
    yield put(serviceLoaded(response));
  } catch (err) {
    yield put(serviceRequestingError(err));
  }
}

export function* changeService(data) {
  console.log('[changeService] with data => ', data);
  // Select username from store
  const requestURL = `http://localhost/api/services/${data.service.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const backId = data.service.id;
    delete data.service.id;
    console.log('[changeService] with body => ', data);
    yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(data.service),
    });
    yield put(loadService(backId));
  } catch (err) {
    yield put(serviceRequestingError(err));
  }
}

export function* getService(data) {
  console.log('[getService] with data => ', data);
  // Select username from store
  const requestURL = `http://localhost/api/services/${data.id}`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(serviceLoaded(response));
  } catch (err) {
    yield put(serviceRequestingError(err));
  }
}

export default function* serviceData() {
  yield all([
    takeLatest(UPDATE_SERVICE, changeService),
    takeLatest(ADD_SERVICE, addService),
    takeLatest(LOAD_SERVICE, getService),
  ]);
}
