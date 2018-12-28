import React, { Component } from 'react';
import './App.css';
import * as OpenWeatherMapAPI from './services/OpenWeatherMapAPI';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      weatherInfo: null,
      forecastInfo: null
    };

    this.init();
  }

  async init() {
    try {
      const position = await this.getGeolocation();
      await this.getWeatherInfo(position);
      await this.getForecastInfo(position);

      this.setState({ ...this.state, loading: false });
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
        this.setState({ ...this.state, weatherInfo: response });
      })
      .catch(error => {
        throw error;
      });
  }

  getForecastInfo(position) {
    return OpenWeatherMapAPI.getForecastInfo(position.lat, position.lon)
      .then(response => {
        console.log('getForecastInfo', response);
        this.setState({ ...this.state, forecastInfo: response });
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="App">
          Loading...
        </div>
      );
    }

    return (
      <div className="App">
        {JSON.stringify(this.state.weatherInfo)}
        {JSON.stringify(this.state.forecastInfo)}
      </div>
    );
  }
}

export default App;
