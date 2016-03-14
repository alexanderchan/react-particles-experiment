
import React, { PropTypes } from 'react';
import {observer} from 'mobx-react';

import Particle from './Particle';

const Particles = observer(({ particles }) => (
    <g>{particles.map(particle =>
        <Particle key={particle.id}
                  particle={particle} />
        )}
    </g>
));

Particles.propTypes = {
    particles: React.PropTypes.object.isRequired
};

export default Particles;
