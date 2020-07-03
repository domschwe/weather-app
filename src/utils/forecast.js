const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=716a8d858200a2d22f09b13babcaa803&units=f&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (!body.current.observation_time) {
      callback("Could not find location. Try another search.");
    } else {
      const data = body.current;
      const forecastData =
        data.weather_descriptions[0] +
        ". It is currently " +
        data.temperature +
        " degrees out. There is a " +
        data.precip +
        "% chance of rain.";
      callback(undefined, forecastData);
    }
  });
};

module.exports = forecast;
