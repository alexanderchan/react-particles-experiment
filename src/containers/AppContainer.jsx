
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import App from '../components';
import { tickTime, tickerStarted, startParticles, stopParticles, updateMousePos, createParticles } from '../actions';


@observer
class AppContainer extends Component {
    startTicker() {
        const { store } = this.props;

        let ticker = () => {
            if (store.tickerStarted) {
                this.maybeCreateParticles();
                store.dispatch(tickTime());

                window.requestAnimationFrame(ticker);
            }
        };

        if (!store.tickerStarted) {
            console.log("Starting ticker");
            store.dispatch(tickerStarted());
            ticker();
        }
    }

    startParticles() {
        const { store } = this.props;
        store.dispatch(startParticles());
    }

    stopParticles() {
        const { store } = this.props;
        store.dispatch(stopParticles());
    }

    updateMousePos(x, y) {
        const { store } = this.props;
        store.dispatch(updateMousePos(x, y));
    }

    maybeCreateParticles() {
        const { store } = this.props;
        const state = store;
        const [x, y] = state.mousePos;

        if (state.generateParticles) {
            store.dispatch(createParticles(state.particlesPerTick, x, y));
        }
    }

    render() {
        const { store } = this.props;
        const state = store;

        return (
            <App {...state}
                 startTicker={::this.startTicker}
                 startParticles={::this.startParticles}
                 stopParticles={::this.stopParticles}
                 updateMousePos={::this.updateMousePos}
            />
        );
    }
};

AppContainer.contextTypes = {
    store: React.PropTypes.object
};

export default AppContainer;
