import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from './reducers/WeatherForecastInfo/actions';
// Styles
import './App.scss';
import { Card } from '@material-ui/core';
// Services
import * as OpenWeatherMapAPI from './services/OpenWeatherMapAPI';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loading: state.weatherForecastInfoState.loading,
  weatherInfo: state.weatherForecastInfoState.weatherInfo,
  forecastInfo: state.weatherForecastInfoState.forecastInfo,
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
    if (this.props.loading || !this.props.weatherInfo || !this.props.forecastInfo) {
      return (
        <div className="App">
          Loading...
        </div>
      );
    }

    return (
      <div className="App">
        <Card className="weather-info">
          <h2>Weather in {this.props.weatherInfo.name}, {this.props.weatherInfo.sys.country}</h2>
          <div className="icon">
            <img src={`https://openweathermap.org/img/w/${this.props.weatherInfo.weather[0].icon}.png`} width='50' height='50' alt='Icon' />
            <h3>{this.props.weatherInfo.main.temp} °C</h3>
          </div>
          <p>{this.props.weatherInfo.weather[0].description}</p>
          <p>{moment.utc(this.props.weatherInfo.dt, 'X').format('HH:mm MMM D')}</p>
          <table>
            <tbody>
              <tr>
                <td>Wind</td>
                <td>{this.props.weatherInfo.wind.speed} m/s</td>
              </tr>
              <tr>
                <td>Cloudiness</td>
                <td>{this.props.weatherInfo.weather[0].description}</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{this.props.weatherInfo.main.pressure} hpa</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{this.props.weatherInfo.main.humidity} %</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{moment.utc(this.props.weatherInfo.sys.sunrise, 'X').format('HH:mm')}</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>{moment.utc(this.props.weatherInfo.sys.sunset, 'X').format('HH:mm')}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card className='forecast-info'>
          <table>
            <thead>
              <tr className='header'>
                <th>City</th>
                {this.props.forecastInfo.list.map((day) => {
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
                  <p className='city'>{this.props.forecastInfo.city.name}, {this.props.forecastInfo.city.country}</p>
                </td>
                {this.props.forecastInfo.list.map((day) => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
