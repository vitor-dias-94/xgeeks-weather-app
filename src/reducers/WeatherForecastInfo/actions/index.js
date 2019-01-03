import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  REFRESH_WEATHER_INFO_LOCATION,
  ADD_FORECAST_DATA,
  DELETE_FORECAST_DATA,
  ADD_CITY_FORECAST
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

export const refreshWeatherLocation = (data) => {
  return {
    type: REFRESH_WEATHER_INFO_LOCATION,
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

export const addCityForecast = (data) => {
  return {
    type: ADD_CITY_FORECAST,
    payload: data
  }
};
