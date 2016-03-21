import React, { PropTypes } from 'react';
import {observer} from 'mobx-react';

const Particle = observer(({ particle: { x, y } }) => (
    <circle cx={x} cy={y} r="1.8" />
));

Particle.propTypes = {
    particle: PropTypes.object.isRequired
};

export default Particle;
