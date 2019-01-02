import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
import './styles.scss';
import { Card } from '@material-ui/core';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loading: state.weatherForecastInfoState.loading,
  weatherInfo: state.weatherForecastInfoState.weatherInfo
});

const mapDispatchToProps = (dispatch) => ({
  //
});

class WeatherInfo extends Component {

  render() {
    if (this.props.loading || !this.props.weatherInfo) {
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
