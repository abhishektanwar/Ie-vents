import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import './app/layout/styles.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
// import { loadEvents } from './features/events/eventActions';

const store = configureStore()

// store.dispatch(loadEvents())
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

