import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux';
import Navigation from './src/Navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
