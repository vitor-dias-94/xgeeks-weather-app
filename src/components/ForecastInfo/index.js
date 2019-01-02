import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from '../../reducers/WeatherForecastInfo/actions';
// Styles
import './styles.scss';
import { Card, Button } from '@material-ui/core';
// Services
import * as OpenWeatherMapAPI from '../../services/OpenWeatherMapAPI';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loadingForecast: state.weatherForecastInfoState.loadingForecast,
  forecastInfo: state.weatherForecastInfoState.forecastInfo
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetWeatherData: () => dispatch(WeatherForecastInfoActions.getWeatherData()),
  dispatchUpdateWeatherData: (d) => dispatch(WeatherForecastInfoActions.updateWeatherData(d)),
  dispatchDeleteForecastData: (d) => dispatch(WeatherForecastInfoActions.deleteForecastData(d)),
});

class ForecastInfo extends Component {

  handleUpdateClick = (city) => {
    this.props.dispatchGetWeatherData();
    this.getWeatherInfo(city.coord)
      .then(response => {
        this.props.dispatchUpdateWeatherData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDeleteClick = (index) => {
    this.props.dispatchDeleteForecastData(index);
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

  render() {
    if (this.props.loadingForecast || !this.props.forecastInfo.length) {
      return (
        <Card className='forecast-info'>
          Loading forecast info...
        </Card>
      );
    }

    return (
      <Card className='forecast-info'>
        <table>
          <thead>
            <tr className='header'>
              <th>City</th>
              {this.props.forecastInfo[0].list.map((day) => {
                return (
                  <th key={day.dt}>
                    <div className='header'>
                      {moment.utc(day.dt, 'X').format('ddd D MMM')}
                      <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} width='50' height='50' alt='Icon' />
                    </div>
                  </th>
                );
              })}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.forecastInfo.map((c, index) => {
              return (
                <tr key={c.city.id}>
                  <td>
                    <p className='city'>{c.city.name}, {c.city.country}</p>
                  </td>
                  {c.list.map((day) => {
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
                  <td>
                    <div className='actions'>
                      <Button size='small' onClick={() => this.handleUpdateClick(c.city)}>
                        See Weather
                      </Button>
                      {index ? <Button size='small' onClick={() => this.handleDeleteClick(index)}>
                        Delete
                      </Button> : ''}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForecastInfo);
