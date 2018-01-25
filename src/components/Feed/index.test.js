import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Postman from '../Postman'

configure({ adapter: new Adapter() });

const result = shallow(<Postman />);

describe('Composer component: ', () => {

    test(`<Postman /> should have  `, () => {
        expect(true);
    })

});
