import React, { Component } from 'react';
import './App.css';
import * as OpenWeatherMapAPI from './services/OpenWeatherMapAPI';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      weatherInfo: null
    };

    this.getData();
  }

  getData() {
    OpenWeatherMapAPI.getWeatherInfo()
      .then(response => {
        this.setState({ ...this.state, loading: false, weatherInfo: response });
      })
      .catch(error => {
        console.error(error);
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
      </div>
    );
  }
}

export default App;
