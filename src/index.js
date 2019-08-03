import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import logo from './static/Snipaste_2019-02-14_16-54-50.jpg';
import App from './App';

ReactDOM.render(<div><App/><img src={logo}></img></div>, document.getElementById('root'));