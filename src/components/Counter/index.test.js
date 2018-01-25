import React from 'react';
import dom from 'react-test-renderer';

import Counter from './';

const renderTree = dom.create(<Counter lengthPost = { 3 } />).toJSON();

test('Counter component should correspond to its snapshot countrepart', () => {
    expect(renderTree).toMatchSnapshot();
});
