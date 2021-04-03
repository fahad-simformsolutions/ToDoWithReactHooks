import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import styles from './styles';

function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

export default AuthLoadingScreen;
