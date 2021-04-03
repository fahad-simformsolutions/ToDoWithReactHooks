import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AddEditTodoScreen from '../modules/ToDos/AddEditToDo';
import TodoListScreen from '../modules/ToDos/TodoList';

const Stack = createStackNavigator();

const TodosNavigation = () => (
  <Stack.Navigator initialRouteName="TodoListScreen" headerMode="none">
    <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
    <Stack.Screen
      name="AddEditTodoScreen"
      component={AddEditTodoScreen}
      initialParams={{editMode: false}}
    />
  </Stack.Navigator>
);

export default TodosNavigation;
