import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles';

import moment from 'moment';

export default class Post extends Component {
    static contextTypes = {
        firstName:  PropTypes.string.isRequired,
        lastName:   PropTypes.string.isRequired
    }

    static propTypes = {
        avatar:     PropTypes.string.isRequired,
        comment:    PropTypes.string.isRequired,
        created:    PropTypes.number.isRequired,
        firstName:  PropTypes.string.isRequired,
        deletePosts:PropTypes.func.isRequired,
        id:         PropTypes.string.isRequired,
        lastName:   PropTypes.string.isRequired

    };
    constructor() {
        super();

        this.handleDeletePost = :: this._handleDeletePost;
    }

    componentWillUpdate () {
        console.log(this.props.id, 'will');
    }

    componentDidUpdate () {
        console.log(this.props.id, 'did');

        // для дебага. если object Object, тогда обворачиваем в strignify
        // console.log(`this.props ------------------------------->>> ${this.props} ${JSON.stringify(this.props)}`);
    }

    //nextProps - сигнатура react (подставляет первым параметром nextProps)
    shouldComponentUpdate(nextProps) {
        // преобразовав при помощи strignify можем сравнить объекты
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _handleDeletePost() {
        const { id } = this.props;

        this.props.deletePosts(id);
    }

    render () {
        const { avatar, id, comment, created, firstName, lastName } = this.props;
        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        return (

            <section className = { Styles.post }>
                <img className = { Styles.avatar } alt = 'homer' src = { avatar } />
                <a href = { id }> { firstName } { lastName }</a>
                <time>It is {moment().format('MMMM D h:mm:ss a')}.</time>
                <p> { comment } </p>

                { `${ownFirstName} ${ownLastName}` === `${firstName} ${lastName}`
                    ? <i className = { Styles.cross } onClick = { this.handleDeletePost } ></i>
                    : null
                }

            </section>
        );
    }
}
