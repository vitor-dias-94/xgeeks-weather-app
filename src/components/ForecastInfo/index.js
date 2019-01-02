import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
import './styles.scss';
import { Card } from '@material-ui/core';
// Utils
import moment from 'moment';

const mapStateToProps = (state) => ({
  loadingForecast: state.weatherForecastInfoState.loadingForecast,
  forecastInfo: state.weatherForecastInfoState.forecastInfo
});

const mapDispatchToProps = (dispatch) => ({
  //
});

class ForecastInfo extends Component {

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
            </tr>
          </thead>
          <tbody>
            {this.props.forecastInfo.map((c) => {
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
