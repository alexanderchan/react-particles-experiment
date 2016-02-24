
import { combineReducers } from 'redux';

import d3 from 'd3';

const Gravity = 0.5,
      randNormal = d3.random.normal(0.3, 2);

const initialState = {
    particles: [],
    particleIndex: 0,
    particlesPerTick: 3,
    svgWidth: 800,
    svgHeight: 600,
    tickerStarted: false,
    generateParticles: false,
    mousePos: [null, null]
};

function particlesApp(state = initialState, action) {
    switch (action.type) {
        case 'TICKER_STARTED':
            return Object.assign({}, state, {
                tickerStarted: true
            });
        case 'START_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: true
            });
        case 'STOP_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: false
            });
        case 'CREATE_PARTICLE':
            let newParticles = state.particles.slice(0),
                particle = action.particle,
                i;

            for (i = 1; i < particle.N; i++) {
                let particle = action.particle;
                particle.id = particle.id+i;
                particle.vector = [particle.id%2 ? -randNormal() : randNormal(),
                               -10];

                newParticles.unshift(action.particle);
            }

            console.log(newParticles.length, i, action);

            return Object.assign({}, state, {
                particles: newParticles,
                particleIndex: state.particleIndex+i+1
            });
        case 'UPDATE_MOUSE_POS':
            return Object.assign({}, state, {
                mousePos: [action.x, action.y]
            });
        case 'TIME_TICK':
            let {svgWidth, svgHeight} = state,
                movedParticles = state.particles
                                      .filter((p) =>
                                          !(p.y > svgHeight || p.x < 0 || p.x > svgWidth))
                                      .map((p) => {
                                          let [vx, vy] = p.vector;
                                          p.x += vx;
                                          p.y += vy;
                                          p.vector[1] += Gravity;
                                          return p;
                                      });
            return Object.assign({}, state, {
                particles: movedParticles
            });
        default:
            return state;
    }
}

export default particlesApp;
