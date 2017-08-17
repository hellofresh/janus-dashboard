import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Icon from '../../Icon/Icon';

const propTypes = {
    className: PropTypes.string,
};

// temporary inline styles untill designer will provide warning icon
const style = {
    color: 'red',
    fontSize: '30px',
};

class Incorrect extends PureComponent {
    state = {
        isOpen: true,
    }

    handleClose = () => {
        console.log('CLOSE');
        this.setState(prevState => ({ isOpen: false }));
    }

    renderInfo = () => {
        const b = block('j-healthcheck__incorrect');

        if (this.state.isOpen) {
            return (
                <div className={b.mix('j-pane')}>
                    {/*<Icon type="correct" className={b('icon')()} />*/}
                    <h1 style={style}>!</h1> {/* @TODO: REMOVE after designer will provide icon */}
                    <p className={b('text')}>
                        Some services are unvailable. Check it on Health Check list <Link to="/healthcheck">here</Link>.
                    </p>
                    <button onClick={this.handleClose}>&times;</button>
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            this.renderInfo()
        );
    }
};

Incorrect.propTypes = propTypes;

export default Incorrect;
