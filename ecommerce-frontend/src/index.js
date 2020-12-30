import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 1000
}


const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <ReactNotification />
        <App/>
    </AlertProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));

serviceWorker.unregister();
