
import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import {particlesStore as store} from './reducers/';
import App from './components/';

ReactDOM.render(
    <App store={store} />,
    document.querySelectorAll('.main')[0]
);

let onResize = function () {
    store.resizeScreen(window.innerWidth, window.innerHeight);
}
onResize();

d3.select(window).on('resize', onResize);
