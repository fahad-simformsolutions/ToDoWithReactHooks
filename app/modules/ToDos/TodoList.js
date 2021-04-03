import React, {useEffect, useContext} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ApplicationStyles} from '../../theme';
import {AuthContext} from '../../contexts';
import {CustomButton} from '../../components';
import {Strings} from '../../constants';
import {getTodos, deleteTodo} from '../../redux/actions';
import styles from './Styles/ToDosStyles';

const RenderButtons = ({navigation, logout}) => (
  <>
    <CustomButton
      theme={Strings.primary}
      title={Strings.addTodo}
      containerStyle={styles.fullButton}
      onClick={() => navigation.navigate('AddEditTodoScreen')}
    />
    <CustomButton
      theme={Strings.primary}
      title={Strings.logout}
      containerStyle={styles.fullButton}
      onClick={logout}
    />
  </>
);

const RenderItem = ({item, navigation}) => {
  const todoItems = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item}</Text>
      <View style={styles.buttonsBg}>
        <CustomButton
          theme={Strings.secondary}
          title={Strings.edit}
          containerStyle={styles.editButton}
          onClick={() =>
            navigation.navigate('AddEditTodoScreen', {
              todoValue: item,
              editMode: true,
            })
          }
        />
        <CustomButton
          theme={Strings.secondary}
          title={Strings.delete}
          containerStyle={styles.deleteButton}
          onClick={() => dispatch(deleteTodo(item, todoItems))}
        />
      </View>
    </View>
  );
};

const TodoList = ({navigation}) => {
  const todoItems = useSelector((state) => state.todos.todos);
  const {logout} = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos);
  }, [dispatch]);

  return (
    <View style={ApplicationStyles.container}>
      <FlatList
        data={todoItems}
        renderItem={({item}) => (
          <RenderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <RenderButtons {...{navigation, logout}} />}
      />
    </View>
  );
};

export default TodoList;
