import { combineReducers } from 'redux';
import WeatherForecastInfo from './WeatherForecastInfo';

export default combineReducers({
  weatherForecastInfoState: WeatherForecastInfo,
});