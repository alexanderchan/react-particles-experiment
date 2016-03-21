import {observable, transaction, extendObservable} from "mobx";

import d3 from 'd3';

const Gravity = 0.5,
      randNormal = d3.random.normal(0.3, 2),
      randNormal2 = d3.random.normal(0.5, 1.8);

export const particlesStore = observable({
    particles: [],
    particlesPerTick: 5,
    svgWidth: 800,
    svgHeight: 600,
    tickerStarted: false,
    generateParticles: false,
    mousePos: [null, null],
    particleIndex: 0
});

particlesStore.dispatch = function(action) {
    const state = particlesStore;

    transaction(() => {
        switch (action.type) {
            case 'TICKER_STARTED':
                state.tickerStarted = true;
                break;
            case 'START_PARTICLES':
                state.generateParticles = true;
                break;
            case 'STOP_PARTICLES':
                state.generateParticles = false;
                break;
            case 'CREATE_PARTICLES':
                for (let i = 0; i < action.N; i++) {
                    state.particles.push({
                        id: ++state.particleIndex,
                        x: action.x,
                        y: action.y,
                        vector: [particle.id%2 ? -randNormal() : randNormal(),
                                    -randNormal2()*3.3]
                    });
                }
                break;
            case 'UPDATE_MOUSE_POS':
                state.mousePos = [action.x, action.y];
                break;
            case 'TIME_TICK':
                let {svgWidth, svgHeight} = state;
                this.particles = particles.filter(p =>
                    !(p.y > svgHeight || p.x < 0 || p.x > svgWidth)
                );
                this.particles.forEach(p => {
                    let [vx, vy] = p.vector;
                    p.x += vx;
                    p.y += vy;
                    p.vector[1] += Gravity;
                });
                break;
            case 'RESIZE_SCREEN':
                state.svgWidth = action.width;
                state.svgHeight = action.height;
                break;
        }
    });
}
