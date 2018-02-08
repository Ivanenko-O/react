import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Composer from './';

configure({ adapter: new Adapter() });

const options = {
    firstName: 'Olesia',
    avatar: 'http://example.com/avatar.jpg'
};

const props = {
    createPost: jest.fn()
};

const message = 'HEllo Lectrum';
const state = {
    comment:            '',
    avatarBorderColor: 'red'
};

const mutatedState = {
    comment:            message,
    avatarBorderColor: 'red'
};

const result = mount(<Composer { ...props } />, {
    context: options
});

describe('Composer component: ', () => {
    beforeEach(() => {
        result.setState(state);
    });

    test(`should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test(`should have 1 'form' element`, () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test(`should have 1 'img' element`, () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test(`should have 1 'textarea' element`, () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test(`should have valid initial state`, () => {
        expect(result.state()).toEqual(state);
    });

    test(`textarea value should be empty initially`, () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test(`should respond to state change properly`, () => {
        result.setState({
            comment: message
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState({
            comment: ''
        });

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe('');
    });

    test(`component state and textarea value should be reflect according changes if form is submitted`, () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);
    });

    test(`createPost method should be invoked  once after the form submitted`, () => {
        props.createPost.mockReset();
        result.setState({
            comment: message
        });
        result.find('form').simulate('submit');
        expect(props.createPost.mock.calls).toHaveLength(1);
    });
});


