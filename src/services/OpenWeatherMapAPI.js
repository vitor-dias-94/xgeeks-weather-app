export const getWeatherInfo = () => {
  return fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9000a8a46d6261d81d801bbf76d78870')
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}