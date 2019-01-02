import {
  GET_WEATHER_FORECAST_DATA,
  SET_WEATHER_FORECAST_DATA,
  ADD_FORECAST_DATA
} from './action-types';

const initialState = {
  loading: false,
  weatherInfo: null,
  forecastInfo: [],
};

const WeatherForecastInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_FORECAST_DATA: {
      return {
        ...state,
        loading: true
      };
    }
    case SET_WEATHER_FORECAST_DATA: {
      return {
        ...state,
        loading: false,
        weatherInfo: action.payload.weatherInfo,
        forecastInfo: [action.payload.forecastInfo],
      };
    }
    case ADD_FORECAST_DATA: {
      return {
        ...state,
        forecastInfo: [...state.forecastInfo, action.payload.forecastInfo],
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