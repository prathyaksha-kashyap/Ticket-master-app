import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { startSetUser } from './actions/user'
import 'bootstrap/dist/css/bootstrap.css'

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})

console.log(store.getState())

localStorage.getItem('x-auth') && (
    store.dispatch(startSetUser())
)

const ele = (
    <Provider store={store}>
            <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));