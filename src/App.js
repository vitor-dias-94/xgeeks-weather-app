import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as AppActions from './reducers/App/actions';
// Styles
import './App.scss';
// Components
import ForecastInfo from './components/ForecastInfo';
import WeatherInfo from './components/WeatherInfo';
import AddCity from './components/AddCity';

const mapStateToProps = (state) => ({
  userLocation: state.appState.userLocation,
  errorMessage: state.appState.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUserLocation: (d) => dispatch(AppActions.setUserLocation(d)),
  dispatchSetError: (d) => dispatch(AppActions.setError(d))
});

class App extends Component {

  constructor(props) {
    super(props);
    this.init();
  }

  async init() {
    try {
      const position = await this.getGeolocation();
      this.props.dispatchSetUserLocation(position);
    } catch (error) {
      console.error(error);
      this.props.dispatchSetError(error.message || error);
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

  render() {
    if (this.props.errorMessage) {
      return (
        <div className="App">
          <p>Error!</p>
          <p>{this.props.errorMessage}</p>
        </div>
      );
    }
    
    if (!this.props.userLocation) {
      return (
        <div className="App">
          <p>Loading user location...</p>
        </div>
      );
    }

    return (
      <div className="App">
        <WeatherInfo />
        <AddCity />
        <ForecastInfo />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
