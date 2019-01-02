import {
  GET_WEATHER_DATA,
  GET_FORECAST_DATA,
  UPDATE_WEATHER_DATA,
  ADD_FORECAST_DATA
} from './action-types';

const initialState = {
  loadingWeather: false,
  loadingForecast: false,
  weatherInfo: null,
  forecastInfo: [],
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
    default: {
      return {
        ...state
      };
    }
  }
};

export default WeatherForecastInfo;