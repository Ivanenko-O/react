// Core
import React from 'react';
import ReactDOM from 'react-dom';

// Instruments
import './theme/reset.css';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';

// App
import App from './containers/App';

// c JSX
// const element = React.createElement('h1', { title: 'a title' }, 'Hello Lectrum');

// без JSX
// const element = <h1 title = 'a title'> Hello Lectrum! </h1>;

// const arr = Array(10).fill(1).map((item, index) => <li key = {index}> Item: {item} </li>);

// ES6
// const arr = [ ...Array(10).keys()].map((item, index) => <li key = {index}> Item: {item} </li>);

// Чтобы посмотреть сразу в консоли press tab
// console.log(element);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
// ReactDOM.render(<ul>{arr}</ul>, document.getElementById('root'));
