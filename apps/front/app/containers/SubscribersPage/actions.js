import {
  LOAD_SUBSCRIBERS,
  LOAD_SUBSCRIBERS_ERROR,
  LOAD_SUBSCRIBERS_SUCCESS,
  REMOVE_SUBSCRIBER,
  REMOVE_SUBSCRIBER_ERROR,
  REMOVE_SUBSCRIBER_SUCCESS,
} from './constants';

export function loadSubscribers() {
  return {
    type: LOAD_SUBSCRIBERS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} subscribers
 *
 * @return {object}      An action object with a type of LOAD_SUBSCRIBERS_SUCCESS passing the repos
 */
export function subscribersLoaded(subscribers) {
  return {
    type: LOAD_SUBSCRIBERS_SUCCESS,
    subscribers,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
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

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function subscriberRemovingError(error) {
  return {
    type: REMOVE_SUBSCRIBER_ERROR,
    error,
  };
}
