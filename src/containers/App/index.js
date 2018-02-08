// Core
import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from '../../routers';

import Navigation from '../../components/Navigation';
import Catcher from '../../components/Catcher';
import Feed from '../../components/Feed';
import Profile from '../../components/Profile';
import avatar from '../../theme/assets/icons/homer.png';


const GROUP_ID = 'pumOFDxHP9';
const TOKEN = 'rv8NWU2E5g';

const options = {
    avatar,
    api: `https://lab.lectrum.io/react/api/${GROUP_ID}`,
    firstName: 'Олеся',
    lastName: 'Иваненко',
    token: TOKEN
};

class App extends Component {
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
        console.log(this.props);
        return (
            <Catcher>
                <Navigation/>
                <Switch>
                    <Route component = { Feed } path = { routes.feed} />
                    <Route component = { Profile }  path = { routes.profile} />
                    <Redirect to = { routes.feed } />
                </Switch>
                {/*<Feed/>*/}
            </Catcher>
        );
    }
}

export default withRouter(App);
