import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from '../../reducers/WeatherForecastInfo/actions';
import * as AppActions from '../../reducers/App/actions';
// Styles
import './styles.scss';
import { Card, Button } from '@material-ui/core';
// Services
import * as OpenWeatherMapAPI from '../../services/OpenWeatherMapAPI';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loadingForecast: state.weatherForecastInfoState.loadingForecast,
  forecastInfo: state.weatherForecastInfoState.forecastInfo,
  userLocation: state.appState.userLocation
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetForecastData: () => dispatch(WeatherForecastInfoActions.getForecastData()),
  dispatchRefreshWeatherLocation: (d) => dispatch(WeatherForecastInfoActions.refreshWeatherLocation(d)),
  dispatchAddForecastData: (d) => dispatch(WeatherForecastInfoActions.addForecastData(d)),
  dispatchDeleteForecastData: (d) => dispatch(WeatherForecastInfoActions.deleteForecastData(d)),
  dispatchSetError: (d) => dispatch(AppActions.setError(d))
});

class ForecastInfo extends Component {

  constructor(props) {
    super(props);
    this.canSaveLocalStorage = false;
    this.init();
  }

  async init() {
    try {
      this.props.dispatchGetForecastData();   
      const forecastInfo = await this.getForecastInfo(this.props.userLocation);
      this.props.dispatchAddForecastData(forecastInfo);
      await this.loadFromLocalStorage();
      this.canSaveLocalStorage = true;
    } catch (error) {
      console.error(error);
      this.props.dispatchSetError(error.message || error);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.canSaveLocalStorage && prevProps.forecastInfo.length !== this.props.forecastInfo.length)
      this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const coordsList = this.props.forecastInfo.map(c => {
      return c.city.coord;
    });
    localStorage.setItem('coordsList', JSON.stringify(coordsList.slice(1)));
  }

  async loadFromLocalStorage() {
    const coordsList = JSON.parse(localStorage.getItem('coordsList'));
    for (let i = 0; i < coordsList.length; i++) {
      const forecastInfo = await this.getForecastInfo(coordsList[i]);
      this.props.dispatchAddForecastData(forecastInfo);
    }
  }

  handleUpdateClick = (city) => {
    this.props.dispatchRefreshWeatherLocation(city.coord);
  }

  handleDeleteClick = (index) => {
    this.props.dispatchDeleteForecastData(index);
  }

  getForecastInfo(location) {
    return OpenWeatherMapAPI.getForecastInfo(location.lat, location.lon)
      .then(response => {
        console.log('getForecastInfo', response);
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
