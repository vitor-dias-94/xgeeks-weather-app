import {
  GET_WEATHER_FORECAST_DATA,
  SET_WEATHER_FORECAST_DATA,
  ADD_FORECAST_DATA
} from '../action-types';

export const getWeatherForecastData = () => {
  return {
    type: GET_WEATHER_FORECAST_DATA
  }
};

export const setWeatherForecastData = (data) => {
  return {
    type: SET_WEATHER_FORECAST_DATA,
    payload: data
  }
};

export const addForecastData = (data) => {
  return {
    type: ADD_FORECAST_DATA,
    payload: data
  }
};
