import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  ADD_FORECAST_DATA,
  DELETE_FORECAST_DATA,
  SET_USER_LOCATION,
  SET_ERROR
} from './action-types';

const initialState = {
  loadingWeather: false,
  loadingForecast: false,
  weatherInfo: null,
  forecastInfo: [],
  userLocation: null,
  errorMessage: ''
};

const WeatherForecastInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_DATA: {
      return {
        ...state,
        loadingWeather: true
      };
    }
    case GET_FORECAST_DATA: {
      return {
        ...state,
        loadingForecast: true
      };
    }
    case UPDATE_WEATHER_DATA: {
      return {
        ...state,
        loadingWeather: false,
        weatherInfo: action.payload,
      };
    }
    case ADD_FORECAST_DATA: {
      return {
        ...state,
        loadingForecast: false,
        forecastInfo: [...state.forecastInfo, action.payload],
      };
    }
    case DELETE_FORECAST_DATA: {
      return {
        ...state,
        forecastInfo: [...state.forecastInfo.slice(0, action.payload), ...state.forecastInfo.slice(action.payload + 1)],
      };
    }
    case SET_USER_LOCATION: {
      return {
        ...state,
        userLocation: action.payload 
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.payload 
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default WeatherForecastInfo;