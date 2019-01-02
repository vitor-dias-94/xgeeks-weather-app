import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from './reducers/WeatherForecastInfo/actions';
// Styles
import './App.scss';
// Components
import ForecastInfo from './components/ForecastInfo';
import WeatherInfo from './components/WeatherInfo';
// Services
import * as OpenWeatherMapAPI from './services/OpenWeatherMapAPI';

const mapStateToProps = (state) => ({
  //
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetWeatherForecastData: () => dispatch(WeatherForecastInfoActions.getWeatherForecastData()),
  dispatchSetWeatherForecastData: (data) => dispatch(WeatherForecastInfoActions.setWeatherForecastData(data)),
});

class App extends Component {

  constructor(props) {
    super(props);

    this.init();
  }

  async init() {
    try {
      this.props.dispatchGetWeatherForecastData();

      let data = {
        weatherInfo: null,
        forecastInfo: null
      };

      const position = await this.getGeolocation();
      data.weatherInfo = await this.getWeatherInfo(position);
      data.forecastInfo = await this.getForecastInfo(position);

      this.props.dispatchSetWeatherForecastData(data);
    } catch (error) {
      console.error(error);
    }
  }

  getGeolocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('Geolocation unavailable.');
      }
    });
  }

  getWeatherInfo(position) {
    return OpenWeatherMapAPI.getWeatherInfo(position.lat, position.lon)
      .then(response => {
        console.log('getWeatherInfo', response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  getForecastInfo(position) {
    return OpenWeatherMapAPI.getForecastInfo(position.lat, position.lon)
      .then(response => {
        console.log('getForecastInfo', response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    return (
      <div className="App">
        <WeatherInfo />
        <ForecastInfo />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
