import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../modules/Login/LoginScreen';
import LoadingScreen from '../modules/Login/AuthLoading';
import {AuthContext} from '../contexts';
import {useLoginState} from './customHooks';
import TodosNavigation from './TodosNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const {username, isLoading, isLogout, loginActions} = useLoginState();

  const loginContext = useMemo(() => ({...loginActions, username}), [
    loginActions,
    username,
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={loginContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLogout ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name="Todos" component={TodosNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigation;
