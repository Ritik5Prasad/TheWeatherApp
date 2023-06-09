import {legacy_createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import weatherReducer from './reducers/weatherReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather','cities'],
  timeout: null,
};

const AppReducers = combineReducers({
  weather: weatherReducer,
});
const rootReducer = (state, action) => {
  return AppReducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

export const persistor = persistStore(store);
