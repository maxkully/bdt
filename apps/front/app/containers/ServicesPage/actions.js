import {
  REMOVE_SERVICE,
  LOAD_SERVICES,
  LOAD_SERVICES_SUCCESS,
  LOAD_SERVICES_ERROR,
  ENABLE_SERVICE,
} from './constants';

export function loadServices() {
  return {
    type: LOAD_SERVICES,
  };
}

export function servicesLoaded(services) {
  return {
    type: LOAD_SERVICES_SUCCESS,
    services,
  };
}

export function servicesRequestingError(error) {
  return {
    type: LOAD_SERVICES_ERROR,
    error,
  };
}

export function removeService(id) {
  return {
    type: REMOVE_SERVICE,
    id,
  };
}

export function enableService(data) {
  return {
    type: ENABLE_SERVICE,
    data,
  };
}
