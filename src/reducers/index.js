import { combineReducers } from 'redux';
import WeatherForecastInfo from './WeatherForecastInfo';
import App from './App';

export default combineReducers({
  weatherForecastInfoState: WeatherForecastInfo,
  appState: App
});