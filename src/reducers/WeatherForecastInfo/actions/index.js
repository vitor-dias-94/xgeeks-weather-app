import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  ADD_FORECAST_DATA,
  DELETE_FORECAST_DATA
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
