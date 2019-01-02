import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  REFRESH_WEATHER_INFO_LOCATION,
  ADD_FORECAST_DATA,
  DELETE_FORECAST_DATA
} from './action-types';

const initialState = {
  loadingWeather: false,
  loadingForecast: false,
  weatherInfo: null,
  weatherInfoLocation: null,
  forecastInfo: []
};

const WeatherForecastInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_DATA: {
      return {
        ...state,
        loadingWeather: true,
        weatherInfoLocation: null,
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
        weatherInfo: action.payload
      };
    }
    case REFRESH_WEATHER_INFO_LOCATION: {
      return {
        ...state,
        weatherInfoLocation: action.payload,
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
    default: {
      return {
        ...state
      };
    }
  }
};

export default WeatherForecastInfo;