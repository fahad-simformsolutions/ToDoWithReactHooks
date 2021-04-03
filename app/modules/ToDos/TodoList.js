import React, {useEffect, useContext} from 'react';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';

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

const RenderItem = ({item, todoItems, navigation, deleteTodoItem}) => {
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
          onClick={() => deleteTodoItem(item, todoItems)}
        />
      </View>
    </View>
  );
};

const TodoList = ({navigation, getTodoItems, deleteTodoItem, todoItems}) => {
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    getTodoItems();
  }, [getTodoItems]);

  return (
    <View style={ApplicationStyles.container}>
      <FlatList
        data={todoItems}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            todoItems={todoItems}
            navigation={navigation}
            deleteTodoItem={deleteTodoItem}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <RenderButtons {...{navigation, logout}} />}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    todoItems: state.todos.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoItems: () => {
      dispatch(getTodos);
    },
    deleteTodoItem: (item, todoItems) => {
      dispatch(deleteTodo(item, todoItems));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
