import {ADD_CITY, GET_WEATHER, SET_ERROR} from '../types';
import {openweathermap_api_key} from '../../../config.json';

export const getWeather = (
  city,
  longitude,
  latitude,
  manual,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async dispatch => {
    try {
      let lat = '';
      let long = '';
      if (manual) {
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
        console.log(resData);
        lat = resData[0].lat;
        long = resData[0].lon;
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${openweathermap_api_key}`,
        );
        const weatherData = await weatherResponse.json();
        await dispatch({
          type: GET_WEATHER,
          payload: weatherData,
          city: city,
          lat: lat,
          long: long,
        });

        await dispatch({
          type: ADD_CITY,
          payload: {
            cityName: city,
            lat: lat,
            long: long,
            weatherData: weatherData,
          },
        });
        onSuccess();
        return;
      }

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${openweathermap_api_key}`,
      );
      const weatherData = await weatherResponse.json();
      await dispatch({
        type: GET_WEATHER,
        payload: weatherData,
        city: weatherData.timezone,
        lat: latitude,
        long: longitude,
      });

      await dispatch({
        type: ADD_CITY,
        payload: {
          cityName: weatherData.timezone,
          lat: latitude,
          long: longitude,
          weatherData: weatherData,
        },
      });

      onSuccess();
    } catch (err) {
      // alert(err);
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
