import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux'
import store from './store'

// eslint-disable-next-line
const render = (Component) => ReactDOM.render(
	<Provider store={store}>
		<Component />
	</Provider>, document.getElementById('root'));

render(App);


if (module.hot) {
	module.hot.accept('./App', () => {
		console.info('App updated');
		const Next = require('./App').App;
		render(Next);
	});
}