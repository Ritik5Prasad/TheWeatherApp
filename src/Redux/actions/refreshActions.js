import {REFRESH_DATA, SET_ERROR} from '../types';
import {openweathermap_api_key} from '../../../config.json';

export const refreshData = (city, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      let lat = '';
      let long = '';
      const latlong = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openweathermap_api_key}`,
      );
      // console.log(latlong)
      if (!latlong.ok) {
        const res = await latlong.json();
        alert('Enter valid city name');
        throw new Error(res.message);
      }

      const resData = await latlong.json();
      lat = resData[0].lat;
      long = resData[0].lon;

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${openweathermap_api_key}`,
      );
      const weatherData = await weatherResponse.json();

      dispatch({
        type: REFRESH_DATA,
        payload: weatherData,
      });

      

      onSuccess();
    } catch (err) {
      alert(err);
      dispatch(setError(err.message));
      onError();
    }
  };
};

const setError = err => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};
