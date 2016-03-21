import {observable, transaction, extendObservable} from "mobx";

import d3 from 'd3';

const Gravity = 0.5,
      randNormal = d3.random.normal(0.3, 2),
      randNormal2 = d3.random.normal(0.5, 1.8);

class Particle {
    id;
    @observable x = 0;
    @observable y = 0;
    @observable vector = [0, 0];

    constructor(id) {
        this.id = id;
    }
}

class ParticleStore {
    @observable particles = [];
    @observable particlesPerTick = 5;
    @observable svgWidth = 800;
    @observable svgHeight = 600;
    @observable tickerStarted = false;
    @observable generateParticles = false;
    @observable mousePos = [null, null];
    particleIndex = 0;

    startTicker() {
        this.tickerStarted = true;
    }

    startParticles() {
        this.generateParticles = true;
    }

    stopParticles() {
        this.generateParticles = false;
    }

    createParticles(N, x, y) {
        transaction(() => {
            for (let i = 0; i < N; i++) {
                // Recycle particles. This way we can prevent creating / removing ParticleViews all the time.
                particle = new Particle(++this.particlesIndex);
                particle.x = x;
                particle.y = y;
                particle.vector = [particle.id%2 ? -randNormal() : randNormal(),
                                -randNormal2()*3.3];
                this.particles.push(particle);
            }
        });
    }

    updateMousePos(x, y) {
        this.mousePos = [x, y];
    }

    timeTick() {
        transaction(() => {
            let {svgWidth, svgHeight, particles} = this;
            this.particles = particles.filter(p =>
                !(p.y > svgHeight || p.x < 0 || p.x > svgWidth)
            );
            this.particles.forEach(p => {
                let [vx, vy] = p.vector;
                p.x += vx;
                p.y += vy;
                p.vector[1] += Gravity;
            });
        });
    }

    resizeScreen(width, height) {
        this.svgWidth = width;
        this.svgHeight = height;
    }
}

export const particlesStore = new ParticleStore();