import {
  ADD_SERVICE,
  CHANGE_TITLE,
  CHANGE_DESCRIPTION,
  RESET_SERVICE,
  UPDATE_SERVICE,
  LOAD_SERVICE,
  LOAD_SERVICE_SUCCESS,
  REMOVE_SERVICE,
  SERVICE_ERROR,
} from './constants';

export function addService(data) {
  console.log('actions/addService with data => ', data);
  return {
    type: ADD_SERVICE,
    service: data,
  };
}

export function updateService(data) {
  return {
    type: UPDATE_SERVICE,
    service: data,
  };
}

export function resetService() {
  return {
    type: RESET_SERVICE,
  };
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}

export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    description,
  };
}

export function loadService(id) {
  return {
    type: LOAD_SERVICE,
    id,
  };
}

export function serviceLoaded(data) {
  return {
    type: LOAD_SERVICE_SUCCESS,
    data,
  };
}

export function serviceRequestingError(error) {
  return {
    type: SERVICE_ERROR,
    error,
  };
}

export function removeService(id) {
  return {
    type: REMOVE_SERVICE,
    id,
  };
}
