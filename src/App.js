import React, { Component } from 'react';
//Styles
import './App.scss';
import { Card } from '@material-ui/core';
// Services
import * as OpenWeatherMapAPI from './services/OpenWeatherMapAPI';
// Utils
import moment from 'moment';

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
        <Card className="weather-info">
          <h2>Weather in {this.state.weatherInfo.name}, {this.state.weatherInfo.sys.country}</h2>
          <div className="icon">
            <img src={`https://openweathermap.org/img/w/${this.state.weatherInfo.weather[0].icon}.png`} width='50' height='50' alt='Icon' />
            <h3>{this.state.weatherInfo.main.temp} °C</h3>
          </div>
          <p>{this.state.weatherInfo.weather[0].description}</p>
          <p>{moment.utc(this.state.weatherInfo.dt, 'X').format('HH:mm MMM D')}</p>
          <table>
            <tbody>
              <tr>
                <td>Wind</td>
                <td>{this.state.weatherInfo.wind.speed} m/s</td>
              </tr>
              <tr>
                <td>Cloudiness</td>
                <td>{this.state.weatherInfo.weather[0].description}</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{this.state.weatherInfo.main.pressure} hpa</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{this.state.weatherInfo.main.humidity} %</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{moment.utc(this.state.weatherInfo.sys.sunrise, 'X').format('HH:mm')}</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>{moment.utc(this.state.weatherInfo.sys.sunset, 'X').format('HH:mm')}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className='forecast-info'>
          <table>
            <thead>
              <tr className='header'>
                <th>City</th>
                {this.state.forecastInfo.list.map((day) => {
                  return (
                    <th key={day.dt}>
                      <div className='header'>
                        {moment.utc(day.dt, 'X').format('ddd D MMM')}
                        <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} width='50' height='50' alt='Icon' />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className='city'>{this.state.forecastInfo.city.name}, {this.state.forecastInfo.city.country}</p>
                </td>
                {this.state.forecastInfo.list.map((day) => {
                  return (
                    <td key={day.dt}>
                      <p><span className='max'>{day.temp.max} °C</span><span className='min'>{day.temp.min} °C</span></p>
                      <p><i>{day.weather[0].description}</i></p>
                      <p>{day.speed} m/s</p>
                      <p>clouds: {day.clouds} %</p>
                      <p>{day.pressure} hpa</p>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

export default App;
