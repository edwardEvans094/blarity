import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from "react-redux"
import { persistor, store } from "./store"

import Routes from './routes'

// import 'normalize.css';
// import './assets/css/app.scss';
// import 'react-dates/initialize'


ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
        <Routes />
    </Provider>
  </PersistGate>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default;
    ReactDOM.render(
      <PersistGate persistor={persistor}>
        <Provider store={store}>
            <NextApp />
        </Provider>
      </PersistGate>,
      document.getElementById('app')
    );
  });
}
