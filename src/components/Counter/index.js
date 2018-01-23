import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
    static propTypes = {
        lengthPost: PropTypes.number.isRequired
    }

    render() {
        const { lengthPost } = this.props;

        return (
            <span> { lengthPost } </span>
        )
    }
}
