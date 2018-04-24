import React from 'react';
import renderer from 'react-test-renderer';

import {
  TextNormal,
  TextPassword,
} from '../src/components/text';

test('renders correctly', () => {
  const tree = renderer.create(<TextNormal />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer.create(<TextPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});
