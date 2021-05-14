import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/app/layout/App';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

