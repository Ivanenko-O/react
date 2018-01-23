import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles';

const portal = document.getElementById('spinner');

const Spinner = ({spin }) =>
    createPortal( spin ? <section className = { Styles.spinner }/> :null, portal);

export default Spinner;
