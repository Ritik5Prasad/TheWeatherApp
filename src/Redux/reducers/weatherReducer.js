import {GET_WEATHER, SET_ERROR, ADD_CITY, REMOVE_CITY,REFRESH_DATA} from '../types';

const initialState = {
  weatherData: null,
  lat: '',
  long: '',
  cities: [],
  currentCity: '',
  error: '',
};

const handleRemoveCity = (item, cities) => {
  const cityIndex = cities.indexOf(item);
  cities.splice(cityIndex, 1);
  return cities;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weatherData: action.payload,
        lat: action.lat,
        long: action.long,
        currentCity: action.city,
        error: '',
      };
      case REFRESH_DATA:
      return {
        ...state,
        weatherData: action.payload,
       
      };
    case ADD_CITY:
      return {...state, cities: [...state.cities, action.payload]};
    case REMOVE_CITY:
      return {
        ...state,
        cities: handleRemoveCity(action.payload, state.cities),
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
