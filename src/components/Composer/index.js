import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';
import { getRandomColor } from "../../helpers/index";

export default class Composer extends Component {
    static contextTypes = {
        avatar:    PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        groupId:   PropTypes.string,
        lastName:  PropTypes.string
    }
    static propTypes = {
        createPost:  PropTypes.func.isRequired
    }

    state = {
        comment: '',
        avatarBorderColor: 'red'
    }

    constructor() {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.denialCopy = ::this._denialCopy;
        this.handleTextAreaKeyPress = :: this._handleTextAreaKeyPress;
        this.createPost = :: this._createPost;
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.createPost();
    }

    _createPost() {
        const { comment } = this.state;

        if (comment) {
            this.props.createPost( comment );
            this.setState({ comment: ''});
        }
    }

    _denialCopy(event) {
        event.preventDefault();
    }

    // стрелочная потому привязка не нужна
    _handleTextAreaChange = ({ target}) => {
        const { value: comment } = target;

        this.setState({ comment });
    }

    _handleTextAreaKeyPress(event) {
        const enterKey = event.key === 'Enter';

        enterKey
            ? this.createPost()
            : this.setState ({
            avatarBorderColor: getRandomColor()
        });

        if(enterKey) {
            event.preventDefault()
        }
    }

    render () {
        const { avatar, firstName } = this.context;
        const { comment, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img alt = 'homer'
                     style = {{ borderColor: avatarBorderColor } }
                     src = { avatar } />

                <form  onSubmit = { this.handleSubmit } >
                    <textarea placeholder = { `Whats your mind, ${firstName}?` }
                              onChange = { this._handleTextAreaChange }
                              value = { comment }
                              onCopy = { this.denialCopy }
                              onKeyPress = { this.handleTextAreaKeyPress }
                    />
                    <input type = 'submit' value = 'Post'  />
                </form>
            </section>
        );
    }
}
