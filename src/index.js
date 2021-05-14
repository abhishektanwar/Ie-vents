import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';

const store = configureStore()
console.log(store.getState());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

