import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, Text} from 'react-native';

import {ApplicationStyles} from '../../theme';
import {AuthContext} from '../../contexts';
import {CustomButton} from '../../components';
import {Strings} from '../../constants';
import {getTodos, deleteTodo} from '../../redux/actions';
import styles from './Styles/ToDosStyles';

const RenderButtons = ({logout}) => {
  const {navigate} = useNavigation();
  return (
    <>
      <CustomButton
        theme={Strings.primary}
        title={Strings.addTodo}
        containerStyle={styles.fullButton}
        onClick={() => navigate('AddEditTodoScreen')}
      />
      <CustomButton
        theme={Strings.primary}
        title={Strings.logout}
        containerStyle={styles.fullButton}
        onClick={logout}
      />
    </>
  );
};

const RenderItem = ({item}) => {
  const todoItems = useSelector((state) => state.todos.todos);
  const {navigate} = useNavigation();
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
            navigate('AddEditTodoScreen', {
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

const TodoList = () => {
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
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <RenderButtons {...{logout}} />}
      />
    </View>
  );
};

export default TodoList;
