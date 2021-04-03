import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {ApplicationStyles} from '../../theme';
import {AuthContext} from '../../contexts';
import styles from './Styles/ToDosStyles';
import {CustomButton, CustomInput} from '../../components';
import {Strings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, editTodo} from '../../redux/actions';

const AddEditToDo = ({navigation, route}) => {
  const todoItems = useSelector((state) => state.todos.todos);
  const {editMode, todoValue} = route.params;
  const [todo, setTodo] = useState(todoValue ? todoValue : '');
  const {username} = useContext(AuthContext);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onAddEdit = () => {
    if (todo.trim() !== '') {
      let newTodoArray = todoItems.map((item) => ({
        task: item,
        addedBy: username,
      }));
      if (
        newTodoArray.length > 0 &&
        newTodoArray.some(
          (item) => item.task.toLowerCase() === todo.toLowerCase(),
        )
      ) {
        setError('Already Exist, please enter another value..!!');
      } else {
        editMode === true
          ? dispatch(editTodo(todo, todoValue, todoItems))
          : dispatch(addTodo(todo, todoItems));
        navigation.goBack();
      }
    } else {
      setError('Required Field..!!');
    }
  };

  return (
    <View style={ApplicationStyles.container}>
      <CustomInput
        value={todo}
        placeholder={'Enter Todo'}
        label={'Todo Item'}
        error={error}
        onChangeText={setTodo}
        onSubmitEditing={onAddEdit}
      />
      <CustomButton
        theme={Strings.primary}
        title={editMode === true ? Strings.editTodo : Strings.addTodo}
        containerStyle={styles.fullButton}
        onClick={onAddEdit}
      />
    </View>
  );
};

export default AddEditToDo;
