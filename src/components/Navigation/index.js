import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './styles';
import { routes } from '../../routers';

export default class Navigation extends Component {
    render() {
        return (
            <section className = { Styles.navigation } >
                <NavLink activeClassName = { Styles.active } to = { routes.feed }>Feed</NavLink>
                <NavLink activeClassName = { Styles.active } to = { routes.profile }>Profile</NavLink>
            </section>
        )
    }
}
