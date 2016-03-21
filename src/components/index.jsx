
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import d3 from 'd3';

import Particles from './Particles';
import Footer from './Footer';
import Header from './Header';

@observer
class App extends Component {
    componentDidMount() {
        let svg = d3.select(this.refs.svg);

        svg.on('mousedown', () => {
            this.updateMousePos();
            this.props.store.startParticles();
        });
        svg.on('touchstart', () => {
            this.updateTouchPos();
            this.props.store.startParticles();
        });
        svg.on('mousemove', () => {
            this.updateMousePos();
        });
        svg.on('touchmove', () => {
            this.updateTouchPos();
        });
        svg.on('mouseup', () => {
            this.props.store.stopParticles();
        });
        svg.on('touchend', () => {
            this.props.store.stopParticles();
        });
        svg.on('mouseleave', () => {
            this.props.store.stopParticles();
        });

    }

    updateMousePos() {
        let [x, y] = d3.mouse(this.refs.svg);
        this.props.store.updateMousePos(x, y);
    }

    updateTouchPos() {
        let [x, y] = d3.touches(this.refs.svg)[0];
        this.props.store.updateMousePos(x, y);
    }

    startTicker() {
        const { store } = this.props;

        let ticker = () => {
            if (store.tickerStarted) {
                this.maybeCreateParticles();
                store.timeTick();

                window.requestAnimationFrame(ticker);
            }
        };

        if (!store.tickerStarted) {
            console.log("Starting ticker");
            store.startTicker();
            ticker();
        }
    }

    maybeCreateParticles() {
        const { store } = this.props;
        const [x, y] = store.mousePos;

        if (store.generateParticles) {
            store.createParticles(store.particlesPerTick, x, y);
        }
    }

    render() {
        return (
            <div onMouseDown={::this.startTicker} style={{overflow: 'hidden'}}>
                 <Header />
                 <svg width={this.props.store.svgWidth}
                      height={this.props.store.svgHeight}
                      ref="svg"
                      style={{background: 'rgba(124, 224, 249, .3)'}}>
                     <Particles particles={this.props.store.particles} />
                 </svg>
                 <Footer particles={this.props.store.particles} />
             </div>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
