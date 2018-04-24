import React from 'react';
import renderer from 'react-test-renderer';

import {
  TaskItem,
  OrderItem,
} from '../src/components/list';

test('renders correctly', () => {
  const tree = renderer.create(
    <TaskItem
      userImg={"https:test1.taskitem.com:8000//user1"}
      username={"taskitem-test1"}
      taskImgs={["https:test1.taskitem.com:8000//task1"]}
      description={"Task test1"}
      price={100}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer.create(
    <OrderItem
      userImg={"https:test1.orderitem.com:8000//user1"}
      username={"orderitem-test1"}
      taskImgs={["https:test1.orderitem.com:8000//task1"]}
      description={"Order test1"}
      onPressChat={()=>console.log("onPressChat")}
      onPressAppointment={()=>console.log("onPressAppointment")}
      price={100}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
