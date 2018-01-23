// Core
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/homer.png';

const GROUP_ID = 'pumOFDxHP9';
const TOKEN = 'rv8NWU2E5g';

const options = {
    avatar,
    api: `https://lab.lectrum.io/react/api/${GROUP_ID}`,
    firstName: 'Олеся',
    lastName: 'Иваненко',
    token: TOKEN
};

export default class App extends Component {
    static childContextTypes = {
        api:        PropTypes.string.isRequired,
        avatar:     PropTypes.string.isRequired,
        firstName:  PropTypes.string.isRequired,
        lastName:   PropTypes.string.isRequired,
        token:      PropTypes.string.isRequired
    };

    getChildContext() {
        return options;
    }

    render() {
        return (
            <Catcher>
                {/*<Feed { ...options } />*/}
                <Feed/>
            </Catcher>
        );
    }
}
