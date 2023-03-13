import {GET_WEATHER, SET_ERROR} from '../types';

const initialState = {
  weatherData: null,
  lat: '',
  long: '',
  currentCity: '',
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        weatherData: action.payload,
        lat: action.lat,
        long: action.long,
        currentCity: action.city,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
