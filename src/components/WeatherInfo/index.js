import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from '../../reducers/WeatherForecastInfo/actions';
import * as AppActions from '../../reducers/App/actions';
// Styles
import './styles.scss';
import { Card } from '@material-ui/core';
// Services
import * as OpenWeatherMapAPI from '../../services/OpenWeatherMapAPI';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loadingWeather: state.weatherForecastInfoState.loadingWeather,
  weatherInfo: state.weatherForecastInfoState.weatherInfo,
  weatherInfoLocation: state.weatherForecastInfoState.weatherInfoLocation,
  userLocation: state.appState.userLocation
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetWeatherData: () => dispatch(WeatherForecastInfoActions.getWeatherData()),
  dispatchUpdateWeatherData: (d) => dispatch(WeatherForecastInfoActions.updateWeatherData(d)),
  dispatchSetError: (d) => dispatch(AppActions.setError(d))
});

class WeatherInfo extends Component {

  constructor(props) {
    super(props);
    this.init(this.props.userLocation);
  }

  async init(location) {
    try {
      this.props.dispatchGetWeatherData();
      const weatherInfo = await this.getWeatherInfo(location);
      this.props.dispatchUpdateWeatherData(weatherInfo);
    } catch (error) {
      console.error(error);
      this.props.dispatchSetError(error.message || error);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.weatherInfoLocation)
      this.init(this.props.weatherInfoLocation);
  }

  getWeatherInfo(location) {
    return OpenWeatherMapAPI.getWeatherInfo(location.lat, location.lon)
      .then(response => {
        console.log('getWeatherInfo', response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    if (this.props.loadingWeather || !this.props.weatherInfo) {
      return (
        <Card className="weather-info">
          Loading weather info...
        </Card>
      );
    }

    return (
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherInfo);
