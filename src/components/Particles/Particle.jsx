import React, { PropTypes } from 'react';
import {observer} from 'mobx-react';

const Particle = observer(({ particle: { x, y, inUse } }) => (
    inUse 
        ? <circle cx={x} cy={y} r="1.8" />
        : <circle cx={-10} cy={-10} r="1.8" />
));

Particle.propTypes = {
    particle: PropTypes.object.isRequired
};

export default Particle;
