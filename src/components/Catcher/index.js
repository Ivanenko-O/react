import React, { Component } from 'react';
import PropTypes, { oneOfType, object, array } from 'prop-types';

import Styles from './styles';

export default class Catcher extends Component {
    static propTypes = {
        children: oneOfType([object, array])
    };
    state = {
        error: false
    };

    componentDidCatch (error, stack){
        this.setState({
            error: true
        });
    }

    render() {
        const {error}    = this.state;
        const {children} = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious 👽 &nbsp;error 📛 &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team 👩🏼‍🚀 👨🏼‍🚀
                        &nbsp;is already working 🚀 &nbsp;in order to fix that
                        for you!
                    </p>
                </section>
            )
        }

        return children;

    }
}
