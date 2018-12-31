import * as CONFIG from '../config';

export const getWeatherInfo = (lat, lon) => {
  return makeRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${CONFIG.APPID}`);
}

export const getForecastInfo = (lat, lon) => {
  return makeRequest(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=metric&APPID=${CONFIG.APPID}`);
}

const makeRequest = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw error;
        });
      } else {
        return response.json();
      }
    })
    .catch(error => {
      throw error;
    });
}