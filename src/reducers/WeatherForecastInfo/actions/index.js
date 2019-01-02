import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  ADD_FORECAST_DATA,
  DELETE_FORECAST_DATA,
  SET_USER_LOCATION,
  SET_ERROR
} from '../action-types';

export const getWeatherData = () => {
  return {
    type: GET_WEATHER_DATA
  }
};

export const getForecastData = () => {
  return {
    type: GET_FORECAST_DATA
  }
};

export const updateWeatherData = (data) => {
  return {
    type: UPDATE_WEATHER_DATA,
    payload: data
  }
};

export const addForecastData = (data) => {
  return {
    type: ADD_FORECAST_DATA,
    payload: data
  }
};

export const deleteForecastData = (data) => {
  return {
    type: DELETE_FORECAST_DATA,
    payload: data
  }
};

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
