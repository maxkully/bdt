import {
  LOAD_SUBSCRIBERS,
  LOAD_SUBSCRIBERS_ERROR,
  LOAD_SUBSCRIBERS_SUCCESS,
  REMOVE_SUBSCRIBER,
  REMOVE_SUBSCRIBER_ERROR,
  REMOVE_SUBSCRIBER_SUCCESS,
  FILTER_BY_PHONE,
  SORTING_BY,
  LOADING_MORE,
  FILTER_BY_DATE_FROM,
  FILTER_BY_DATE_TO,
} from './constants';

export function loadSubscribers(query) {
  return {
    type: LOAD_SUBSCRIBERS,
    query,
  };
}

export function subscribersLoaded(response) {
  return {
    type: LOAD_SUBSCRIBERS_SUCCESS,
    response,
  };
}

export function subscribersLoadingError(error) {
  return {
    type: LOAD_SUBSCRIBERS_ERROR,
    error,
  };
}

export function removeSubscriber(id) {
  return {
    type: REMOVE_SUBSCRIBER,
    id,
  };
}

export function subscriberRemoved() {
  return {
    type: REMOVE_SUBSCRIBER_SUCCESS,
  };
}

export function subscriberRemovingError(error) {
  return {
    type: REMOVE_SUBSCRIBER_ERROR,
    error,
  };
}

export function filterByPhone(phone) {
  return {
    type: FILTER_BY_PHONE,
    phone,
  };
}

export function filterByDateFrom(date) {
  return {
    type: FILTER_BY_DATE_FROM,
    date,
  };
}

export function filterByDateTo(date) {
  return {
    type: FILTER_BY_DATE_TO,
    date,
  };
}

export function sortingBy(sorting) {
  return {
    type: SORTING_BY,
    sorting,
  };
}

export function loadMore() {
  return {
    type: LOADING_MORE,
  };
}
