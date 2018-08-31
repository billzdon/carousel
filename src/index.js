import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import carouselApp from './reducers/all.js'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {reducer as responsive, mediaQueryTracker} from 'redux-mediaquery'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const loggerMiddleware = createLogger();

let store = createStore(
  carouselApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const persistor = persistStore(store)

store.dispatch(mediaQueryTracker({
  isPhone: "screen and (max-width: 767px)",
  isTablet: "screen and (max-width: 1024px)",
  innerWidth: true,
  innerHeight: true,
}))

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();
