import {
  SET_USER_LOCATION,
  SET_ERROR
} from '../action-types';

export const setUserLocation = (data) => {
  return {
    type: SET_USER_LOCATION,
    payload: data
  }
};

export const setError = (data) => {
  return {
    type: SET_ERROR,
    payload: data
  }
};
