import React from 'react';
import renderer from 'react-test-renderer';

import {
  LineButton,
  LineTextButton,
  AccountButton,
  ChatButton,
  FabButton,
  AccentFabButton,
} from '../src/components/button';


test('renders correctly', () => {
  const tree = renderer.create(
    <ChatButton
      imgUri={"submit-test1-img-uri"}
      username={"test1"}
      email={"submit.test1@test.edu"}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', ()=>{
  const tree = renderer.create(<LineButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', ()=>{
  const tree = renderer.create(<LineTextButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', ()=>{
  const tree = renderer.create(<FabButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', ()=>{
  const tree = renderer.create(<AccentFabButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
