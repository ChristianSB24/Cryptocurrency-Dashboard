import React from 'react';
import ReactDOM from 'react-dom';
import CryptoList from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CryptoList />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
