import React, { Component } from 'react';


import Styles from './styles';

export default class Profile extends Component {
    render() {
        return (
            <section className = {Styles.navigation} >
                <h1>My profile</h1>
            </section>
        )
    }
}
