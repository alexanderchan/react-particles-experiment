
import React, { PropTypes } from 'react';
import {observer} from 'mobx-react';

const Footer = observer(({ particles }) => (
    <div style={{position: 'absolute', bottom: 0}} className="container">
        <strong>{particles.reduce(
            (sum, p) => sum + (p.inUse ? 1: 0), 0
        )} particles</strong>
    </div>
));

Footer.propTypes = {
    particles: PropTypes.object.isRequired
};

export default Footer;
