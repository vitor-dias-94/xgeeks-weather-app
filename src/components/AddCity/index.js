import React, { Component } from 'react';
import { connect } from 'react-redux';
// Reducers actions
import * as WeatherForecastInfoActions from '../../reducers/WeatherForecastInfo/actions';
// Styles
import './styles.scss';
import autocompleteStyles from './autocompleteStyles';
// Components
import ReactAutocomplete from 'react-autocomplete';
// Services
import * as OpenWeatherMapAPI from '../../services/OpenWeatherMapAPI';
// Utils
import _ from 'lodash';

const mapStateToProps = (state) => ({
  //
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddForecastData: (d) => dispatch(WeatherForecastInfoActions.addForecastData(d)),
});

class AddCity extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      inputValue: '',
      findResult: []
    };

    this.timeout = null;
  }

  findCities(value) {
    clearTimeout(this.timeout);

    if (value.length < 3 || value.length > 80) {
      this.setState({ ...this.state, inputValue: value, findResult: [] });
      return;
    }
    this.setState({ ...this.state, inputValue: value });

    this.timeout = setTimeout(() => {
      this.setState({ ...this.state, loading: true });
      OpenWeatherMapAPI.findCities(value)
        .then(response => {
          console.log('findCities', response);
          const cleanList = _.uniqBy(response.list, 'id');
          if (cleanList.length) {
            this.setState({ ...this.state, findResult: cleanList, loading: false });
          } else {
            this.setState({ ...this.state, findResult: [{ id: 0, resultMessage: 'No cities found.' }], loading: false });
          }
        })
        .catch(error => {
          this.setState({ ...this.state, findResult: [], loading: false });
          console.error(error);
        });
    }, 500);
  }

  addCity(city) {
    this.getForecastInfo(city.coord)
      .then(response => {
        this.props.dispatchAddForecastData({ forecastInfo: response });
      })
      .catch(error => {
        console.error(error);
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

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div className="add-city">
        <p><b>Add city:</b></p>
        <div className='autocomplete'>
          <ReactAutocomplete
            items={this.state.findResult}
            getItemValue={item => `${item.name}, ${item.sys.country}`}
            value={this.state.inputValue}
            onChange={e => this.findCities(e.target.value)}
            onSelect={(value, item) => this.addCity(item)}
            renderItem={(item, highlighted) =>
              <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                {item.resultMessage ? item.resultMessage : `${item.name}, ${item.sys.country}`}
              </div>
            }
            isItemSelectable={(item) => {
              return item.resultMessage ? false : true;
            }}
            menuStyle={autocompleteStyles}
          />
          {this.state.loading ? <p className='loading'>Loading...</p> : ''}
        </div>
        <p>Example: Leiria, PT</p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCity);
