import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import {createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk';
// import reducer from './reducers'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store/store'

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose
//
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
