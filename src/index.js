import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MyApp = () => (
    <MuiThemeProvider>
    <App />
    </MuiThemeProvider>
    );

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();
