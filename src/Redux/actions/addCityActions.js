import {ADD_CITY, SET_ERROR} from '../types';

export const addCity = (item, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_CITY,
        payload: item,
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
