import React  from 'react';
import {string} from 'prop-types';

import Styles from './styles';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import {fromTo } from 'gsap';

const Postman  = (props,{firstName, avatar}) =>(
    <section className = { Styles.postman } >
        <span>Hola, online { firstName } </span>
        <img src = { avatar } alt = { firstName } />
    </section>
);

Postman.contextTypes = {
    avatar: string.isRequired,
    firstName: string.isRequired
};

export default Postman;

