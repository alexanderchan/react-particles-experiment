
import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import {particlesStore as store} from './reducers/';
import AppContainer from './containers/AppContainer';
import { resizeScreen } from './actions';

ReactDOM.render(
    <AppContainer store={store} />,
    document.querySelectorAll('.main')[0]
);

let onResize = function () {
    store.dispatch(resizeScreen(window.innerWidth, window.innerHeight));
}
onResize();

d3.select(window).on('resize', onResize);
