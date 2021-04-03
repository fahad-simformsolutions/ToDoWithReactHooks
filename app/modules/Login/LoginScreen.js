import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';

import {CustomButton, CustomInput} from '../../components';
import {AuthContext} from '../../contexts';
import {Strings} from '../../constants';
import styles from './styles';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const {login} = useContext(AuthContext);
  const onLoginButtonClick = async () => {
    if (username) {
      await login(username);
    } else {
      setError('Please enter username.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login as</Text>
      <CustomInput
        value={username}
        placeholder={'Enter Name'}
        label={'Username'}
        error={error}
        onChangeText={setUsername}
        onSubmitEditing={onLoginButtonClick}
      />
      <CustomButton
        theme={Strings.primary}
        title={Strings.login}
        containerStyle={styles.fullButton}
        onClick={onLoginButtonClick}
      />
    </View>
  );
}

export default Login;
