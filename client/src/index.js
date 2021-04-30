import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import {StylesProvider} from '@material-ui/styles'

import App from './App';
import './index.css';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
);

serviceWorker.unregister();